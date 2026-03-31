import { supabase } from './supabase';

type AnalyticsEvent = 'landing_page_view' | 'checkout_initiated' | 'purchase_completed';

const EXCLUDED_IPS = ['2001:4860:7:305::f4', '191.113.128.11'];

async function getClientIP(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip ?? null;
  } catch {
    return null;
  }
}

export async function trackEvent(event: AnalyticsEvent, metadata?: Record<string, unknown>) {
  try {
    const ip = await getClientIP();
    if (ip && EXCLUDED_IPS.includes(ip)) return;

    await supabase.from('analytics_events').insert({
      event,
      user_id: null,
      metadata: metadata ?? null,
    });
  } catch {
    // silently fail — never block user flow for analytics
  }
}
