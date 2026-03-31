import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get("days") ?? "30");
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const analyticsEvents = ["landing_page_view", "checkout_initiated"];
    const totals: Record<string, number> = {};
    const daily: Record<string, Record<string, number>> = {};

    for (const event of analyticsEvents) {
      const { count } = await supabase
        .from("analytics_events")
        .select("*", { count: "exact", head: true })
        .eq("event", event)
        .gte("created_at", since);
      totals[event] = count ?? 0;
    }

    const { count: purchaseCount } = await supabase
      .from("payments")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")
      .gte("created_at", since);
    totals["purchase_completed"] = purchaseCount ?? 0;

    const { data: analyticsRows } = await supabase
      .from("analytics_events")
      .select("event, created_at")
      .in("event", analyticsEvents)
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    for (const row of analyticsRows ?? []) {
      const day = row.created_at.slice(0, 10);
      if (!daily[day]) daily[day] = {};
      daily[day][row.event] = (daily[day][row.event] ?? 0) + 1;
    }

    const { data: paymentRows } = await supabase
      .from("payments")
      .select("created_at")
      .eq("status", "approved")
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    for (const row of paymentRows ?? []) {
      const day = row.created_at.slice(0, 10);
      if (!daily[day]) daily[day] = {};
      daily[day]["purchase_completed"] = (daily[day]["purchase_completed"] ?? 0) + 1;
    }

    return new Response(JSON.stringify({ totals, daily }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
