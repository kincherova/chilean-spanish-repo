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
  grantPremium: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const initialised = useRef(false);
  const premiumFetchGen = useRef(0);

  async function fetchPremiumStatus(userId: string): Promise<boolean> {
    const gen = ++premiumFetchGen.current;
    const { data } = await supabase
      .from('user_profiles')
      .select('is_premium')
      .eq('id', userId)
      .maybeSingle();
    if (gen !== premiumFetchGen.current) return data?.is_premium ?? false;
    const premium = data?.is_premium ?? false;
    setIsPremium(premium);
    return premium;
  }

  useEffect(() => {
    let resolved = false;
    const resolve = () => {
      if (!resolved) {
        resolved = true;
        initialised.current = true;
        setLoading(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setSession(null);
        setUser(null);
        setIsPremium(false);
        resolve();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        (async () => {
          await fetchPremiumStatus(session.user.id);
          resolve();
        })();
      } else {
        premiumFetchGen.current++;
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
    await supabase.auth.signOut({ scope: 'local' });
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      return { error: signInError };
    }
    return { error: null, accessToken: signInData.session?.access_token };
  };

  const refreshPremium = async (userId?: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const id = userId ?? session?.user?.id ?? user?.id;
    if (id) {
      const { data } = await supabase
        .from('user_profiles')
        .select('is_premium')
        .eq('id', id)
        .maybeSingle();
      premiumFetchGen.current = premiumFetchGen.current + 1000;
      setIsPremium(data?.is_premium ?? false);
    }
  };

  const grantPremium = () => {
    premiumFetchGen.current = premiumFetchGen.current + 1000;
    setIsPremium(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isPremium, signIn, signUp, signOut, refreshPremium, grantPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
