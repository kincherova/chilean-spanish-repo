import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPremium: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null; accessToken?: string }>;
  signOut: () => Promise<void>;
  refreshPremium: (userId?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const initialised = useRef(false);

  async function fetchPremiumStatus(userId: string) {
    const { data } = await supabase
      .from('user_profiles')
      .select('is_premium')
      .eq('id', userId)
      .maybeSingle();
    setIsPremium(data?.is_premium ?? false);
  }

  useEffect(() => {
    const resolve = () => {
      if (!initialised.current) {
        initialised.current = true;
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        (async () => {
          await fetchPremiumStatus(session.user.id);
          resolve();
        })();
      } else {
        setIsPremium(false);
        resolve();
      }
    });

    const fallback = setTimeout(resolve, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(fallback);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercadopago/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, password, name }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return { error: new Error(data.error || 'Sign up failed') };
    }
    if (data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      return { error: null, accessToken: data.session.access_token };
    }
    return { error: null };
  };

  const refreshPremium = async (userId?: string) => {
    const id = userId ?? user?.id;
    if (id) {
      await fetchPremiumStatus(id);
    } else {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) await fetchPremiumStatus(session.user.id);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isPremium, signIn, signUp, signOut, refreshPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
