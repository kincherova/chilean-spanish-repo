import { supabase } from './supabase';

type AnalyticsEvent = 'landing_page_view' | 'checkout_initiated' | 'purchase_completed';

export async function trackEvent(event: AnalyticsEvent, metadata?: Record<string, unknown>) {
  try {
    let userId: string | null = null;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      userId = session?.user?.id ?? null;
    } catch {
      userId = null;
    }
    await supabase.from('analytics_events').insert({
      event,
      user_id: userId,
      metadata: metadata ?? null,
    });
  } catch {
    // silently fail — never block user flow for analytics
  }
}
