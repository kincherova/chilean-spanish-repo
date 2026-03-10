import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type ResultType = 'success' | 'failure' | 'pending';

const config: Record<ResultType, {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bg: string;
  iconBg: string;
  btnLabel: string;
  btnTo: string;
}> = {
  success: {
    icon: <CheckCircle2 size={40} className="text-green-600" />,
    title: 'Payment approved!',
    subtitle: 'You now have full access to all modules and lessons.',
    bg: 'from-green-50 to-emerald-50',
    iconBg: 'bg-green-100',
    btnLabel: 'Start learning',
    btnTo: '/modules',
  },
  pending: {
    icon: <Clock size={40} className="text-amber-500" />,
    title: 'Payment pending',
    subtitle: 'Your payment is being processed. We\'ll unlock your access as soon as it\'s confirmed.',
    bg: 'from-amber-50 to-orange-50',
    iconBg: 'bg-amber-100',
    btnLabel: 'Go to modules',
    btnTo: '/modules',
  },
  failure: {
    icon: <XCircle size={40} className="text-red-500" />,
    title: 'Payment failed',
    subtitle: 'Something went wrong with your payment. You can try again from your profile.',
    bg: 'from-red-50 to-rose-50',
    iconBg: 'bg-red-100',
    btnLabel: 'Back to profile',
    btnTo: '/profile',
  },
};

export default function PaymentResultPage({ result }: { result: ResultType }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshPremium } = useAuth();
  const [verifying, setVerifying] = useState(result === 'success');

  useEffect(() => {
    if (result !== 'success') return;

    const paymentId = searchParams.get('payment_id');
    if (!paymentId) {
      setVerifying(false);
      return;
    }

    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercadopago/verify`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ payment_id: paymentId }),
          }
        );
        if (res.ok) {
          await refreshPremium();
        }
      } finally {
        setVerifying(false);
      }
    })();
  }, [result, searchParams, refreshPremium]);

  const cfg = config[result];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${cfg.bg} flex items-center justify-center px-4`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full p-8 text-center">
        <div className={`w-20 h-20 ${cfg.iconBg} rounded-full flex items-center justify-center mx-auto mb-5`}>
          {cfg.icon}
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">{cfg.title}</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">{cfg.subtitle}</p>

        {verifying ? (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            Verifying payment...
          </div>
        ) : (
          <button
            onClick={() => navigate(cfg.btnTo)}
            className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {cfg.btnLabel}
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
