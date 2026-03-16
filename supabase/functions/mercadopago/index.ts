import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MP_ACCESS_TOKEN = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function supabaseAdmin() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

async function createPreference(userId: string, userEmail: string, appUrl: string) {
  const body = {
    items: [
      {
        id: "premium-access",
        title: "Survival Chilean Spanish — Premium Access",
        description: "Unlock all 5 modules and every lesson",
        quantity: 1,
        currency_id: "CLP",
        unit_price: 19900,
      },
    ],
    payer: {
      email: userEmail,
    },
    back_urls: {
      success: `${appUrl}/payment/success`,
      failure: `${appUrl}/payment/failure`,
      pending: `${appUrl}/payment/pending`,
    },
    auto_return: "approved",
    external_reference: userId,
    notification_url: `${SUPABASE_URL}/functions/v1/mercadopago/webhook`,
  };

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`MercadoPago error: ${err}`);
  }

  return res.json();
}

async function handleWebhook(req: Request) {
  const url = new URL(req.url);
  const topic = url.searchParams.get("topic") || url.searchParams.get("type");
  const id = url.searchParams.get("id") || url.searchParams.get("data.id");

  if (topic !== "payment") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (!id) {
    return new Response("missing id", { status: 400, headers: corsHeaders });
  }

  const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
  });

  if (!paymentRes.ok) {
    return new Response("payment not found", { status: 404, headers: corsHeaders });
  }

  const payment = await paymentRes.json();
  const userId = payment.external_reference;
  const status = payment.status;

  const db = supabaseAdmin();

  await db
    .from("payments")
    .update({ status, mp_payment_id: String(id), updated_at: new Date().toISOString() })
    .eq("mp_preference_id", payment.order?.id ? String(payment.order.id) : "")
    .eq("user_id", userId);

  if (status === "approved") {
    await db
      .from("user_profiles")
      .update({ is_premium: true })
      .eq("id", userId);
  }

  return new Response("ok", { status: 200, headers: corsHeaders });
}

async function handleProcessPayment(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const db = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: { user }, error: authError } = await db.auth.getUser();
  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const formData = await req.json().catch(() => null);
  if (!formData) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const paymentBody = {
    ...formData,
    external_reference: user.id,
    notification_url: `${SUPABASE_URL}/functions/v1/mercadopago/webhook`,
    payer: {
      ...formData.payer,
      email: formData.payer?.email || user.email,
    },
  };

  const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      "X-Idempotency-Key": `${user.id}-${Date.now()}`,
    },
    body: JSON.stringify(paymentBody),
  });

  if (!mpRes.ok) {
    const err = await mpRes.text();
    return new Response(JSON.stringify({ error: `MercadoPago error: ${err}` }), {
      status: mpRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const payment = await mpRes.json();
  const status = payment.status;
  const admin = supabaseAdmin();

  await admin.from("payments").insert({
    user_id: user.id,
    mp_payment_id: String(payment.id),
    mp_preference_id: String(payment.order?.id ?? ""),
    status,
    amount: payment.transaction_amount ?? 9990,
    currency: payment.currency_id ?? "CLP",
  });

  if (status === "approved") {
    await admin.from("user_profiles").update({ is_premium: true }).eq("id", user.id);
  }

  return new Response(
    JSON.stringify({ status, payment_id: payment.id, is_premium: status === "approved" }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/mercadopago/, "");

    if (path === "/webhook" || path === "/webhook/") {
      return handleWebhook(req);
    }

    if (path === "/create-preference" || path === "/create-preference/") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const db = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });

      const { data: { user }, error: authError } = await db.auth.getUser();
      if (authError || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const body = await req.json().catch(() => ({}));
      const appUrl = body.appUrl || "https://jrztugpstdfpcdobehxp.supabase.co";

      const preference = await createPreference(user.id, user.email!, appUrl);

      const admin = supabaseAdmin();
      await admin.from("payments").insert({
        user_id: user.id,
        mp_preference_id: preference.id,
        status: "pending",
        amount: 19900,
        currency: "CLP",
      });

      return new Response(
        JSON.stringify({ init_point: preference.init_point, sandbox_init_point: preference.sandbox_init_point, id: preference.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (path === "/process-payment" || path === "/process-payment/") {
      return handleProcessPayment(req);
    }

    if (path === "/verify" || path === "/verify/") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const db = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });

      const { data: { user }, error: authError } = await db.auth.getUser();
      if (authError || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const body = await req.json().catch(() => ({}));
      const paymentId = body.payment_id;

      if (!paymentId) {
        return new Response(JSON.stringify({ error: "missing payment_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
      });

      if (!paymentRes.ok) {
        return new Response(JSON.stringify({ error: "payment not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const payment = await paymentRes.json();
      const status = payment.status;

      const admin = supabaseAdmin();

      await admin
        .from("payments")
        .update({ status, mp_payment_id: String(paymentId), updated_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("status", "pending");

      if (status === "approved") {
        await admin.from("user_profiles").update({ is_premium: true }).eq("id", user.id);
      }

      return new Response(
        JSON.stringify({ status, is_premium: status === "approved" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (path === "/signup" || path === "/signup/") {
      const body = await req.json().catch(() => ({}));
      const { email, password, name } = body;

      if (!email || !password || !name) {
        return new Response(JSON.stringify({ error: "email, password, and name are required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (password.length < 4) {
        return new Response(JSON.stringify({ error: "Password must be at least 4 characters" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const admin = supabaseAdmin();

      const { data: createData, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
      });

      if (createError) {
        return new Response(JSON.stringify({ error: createError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const newUser = createData.user;

      await admin.from("user_profiles").upsert({
        id: newUser.id,
        name,
        email,
        onboarding_completed: false,
      });

      const { data: signInData, error: signInError } = await admin.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

      if (signInError || !signInData?.properties?.hashed_token) {
        const { data: sessionData, error: sessionError } = await createClient(
          SUPABASE_URL,
          Deno.env.get("SUPABASE_ANON_KEY")!
        ).auth.signInWithPassword({ email, password });

        if (sessionError || !sessionData.session) {
          return new Response(JSON.stringify({
            success: true,
            user_id: newUser.id,
            session: null,
          }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify({
          success: true,
          user_id: newUser.id,
          session: sessionData.session,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { data: sessionData, error: sessionError } = await createClient(
        SUPABASE_URL,
        Deno.env.get("SUPABASE_ANON_KEY")!
      ).auth.signInWithPassword({ email, password });

      if (sessionError || !sessionData.session) {
        return new Response(JSON.stringify({
          success: true,
          user_id: newUser.id,
          session: null,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      return new Response(JSON.stringify({
        success: true,
        user_id: newUser.id,
        session: sessionData.session,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (path === "/redeem-code" || path === "/redeem-code/") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const db = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });

      const { data: { user }, error: authError } = await db.auth.getUser();
      if (authError || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const body = await req.json().catch(() => ({}));
      const rawCode = (body.code ?? "").trim().toLowerCase();

      if (!rawCode) {
        return new Response(JSON.stringify({ error: "No code provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const admin = supabaseAdmin();

      const { data: codeRow, error: codeError } = await admin
        .from("access_codes")
        .select("id, is_active, max_uses, use_count")
        .eq("code", rawCode)
        .maybeSingle();

      if (codeError || !codeRow) {
        return new Response(JSON.stringify({ error: "Invalid access code" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!codeRow.is_active) {
        return new Response(JSON.stringify({ error: "This access code is no longer active" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (codeRow.max_uses !== null && codeRow.use_count >= codeRow.max_uses) {
        return new Response(JSON.stringify({ error: "This access code has reached its usage limit" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await admin
        .from("access_codes")
        .update({ use_count: codeRow.use_count + 1 })
        .eq("id", codeRow.id);

      const userName = (user.user_metadata?.name as string) || (user.email?.split("@")[0] ?? "User");
      await admin
        .from("user_profiles")
        .upsert({
          id: user.id,
          name: userName,
          email: user.email ?? "",
          is_premium: true,
          onboarding_completed: false,
        }, { onConflict: "id" });

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
