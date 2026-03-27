import { supabase } from './supabase';

type AnalyticsEvent = 'landing_page_view' | 'checkout_initiated' | 'purchase_completed';

export async function trackEvent(event: AnalyticsEvent, metadata?: Record<string, unknown>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('analytics_events').insert({
      event,
      user_id: user?.id ?? null,
      metadata: metadata ?? null,
    });
  } catch {
    // silently fail — never block user flow for analytics
  }
}
