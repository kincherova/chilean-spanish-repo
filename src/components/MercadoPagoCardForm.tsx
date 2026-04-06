import { useState, useEffect, useRef } from 'react';
import { Loader2, Lock } from 'lucide-react';

declare global {
  interface Window {
    MercadoPago: new (publicKey: string, options?: { locale: string }) => MPInstance;
  }
}

interface MPInstance {
  fields: {
    create: (type: string, options: object) => MPField;
    createCardToken: (data: object) => Promise<{ id: string }>;
  };
  getPaymentMethods: (params: { bin: string }) => Promise<{ results: Array<{ id: string; name: string; issuer: { id: string } }> }>;
  getInstallments: (params: { amount: string; bin: string }) => Promise<Array<{ payer_costs: Array<{ installments: number; recommended_message: string }> }>>;
}

interface MPField {
  mount: (containerId: string) => void;
  unmount: () => void;
  on: (event: string, callback: (data?: unknown) => void) => void;
}

interface Props {
  onSubmit: (token: string, paymentMethodId: string, issuerId: string, installments: number) => Promise<void>;
  onError: (msg: string) => void;
  isProcessing: boolean;
}

export default function MercadoPagoCardForm({ onSubmit, onError, isProcessing }: Props) {
  const [ready, setReady] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationError, setExpirationError] = useState('');
  const [securityCodeError, setSecurityCodeError] = useState('');
  const [nameError, setNameError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const mpRef = useRef<MPInstance | null>(null);
  const fieldsRef = useRef<{ cardNumber?: MPField; expiration?: MPField; securityCode?: MPField }>({});
  const mountedRef = useRef(false);
  const binRef = useRef('');
  const paymentMethodIdRef = useRef('');
  const issuerIdRef = useRef('');

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
    if (!publicKey || !window.MercadoPago) {
      onError('Payment system unavailable. Please try again later.');
      return;
    }

    const mp = new window.MercadoPago(publicKey, { locale: 'en-US' });
    mpRef.current = mp;

    const cardNumber = mp.fields.create('cardNumber', {
      placeholder: '1234 1234 1234 1234',
      style: fieldStyle,
    });
    const expiration = mp.fields.create('expirationDate', {
      placeholder: 'MM/YY',
      style: fieldStyle,
    });
    const securityCode = mp.fields.create('securityCode', {
      placeholder: '123',
      style: fieldStyle,
    });

    cardNumber.mount('mp-card-number');
    expiration.mount('mp-expiration');
    securityCode.mount('mp-security-code');

    fieldsRef.current = { cardNumber, expiration, securityCode };

    cardNumber.on('ready', () => setReady(true));
    cardNumber.on('error', (e) => { const err = e as { message?: string }; setCardNumberError(err?.message || ''); });
    cardNumber.on('validityChange', (e) => { const d = e as { errorMessages?: string[] }; setCardNumberError(d?.errorMessages?.[0] || ''); });
    expiration.on('error', (e) => { const err = e as { message?: string }; setExpirationError(err?.message || ''); });
    expiration.on('validityChange', (e) => { const d = e as { errorMessages?: string[] }; setExpirationError(d?.errorMessages?.[0] || ''); });
    securityCode.on('error', (e) => { const err = e as { message?: string }; setSecurityCodeError(err?.message || ''); });
    securityCode.on('validityChange', (e) => { const d = e as { errorMessages?: string[] }; setSecurityCodeError(d?.errorMessages?.[0] || ''); });

    cardNumber.on('binChange', async (e) => {
      const data = e as { bin?: string };
      const bin = data?.bin || '';
      if (bin.length >= 6 && bin !== binRef.current) {
        binRef.current = bin;
        try {
          const methods = await mp.getPaymentMethods({ bin });
          if (methods.results.length > 0) {
            paymentMethodIdRef.current = methods.results[0].id;
            issuerIdRef.current = String(methods.results[0].issuer?.id || '');
          }
        } catch {
          // ignore
        }
      }
    });

    return () => {
      cardNumber.unmount();
      expiration.unmount();
      securityCode.unmount();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardholderName.trim()) {
      setNameError('Please enter the name as it appears on your card');
      return;
    }
    setNameError('');
    setSubmitting(true);
    try {
      const mp = mpRef.current;
      if (!mp) throw new Error('Payment not initialized');

      const token = await mp.fields.createCardToken({
        cardholderName: cardholderName.trim(),
        identificationType: 'Otro',
        identificationNumber: '0',
      });

      await onSubmit(
        token.id,
        paymentMethodIdRef.current,
        issuerIdRef.current,
        1,
      );
    } catch (err) {
      const e = err as { message?: string };
      onError(e?.message || 'Could not process card. Please check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const busy = submitting || isProcessing;

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Card number</label>
        <div
          id="mp-card-number"
          className="w-full border border-gray-200 rounded-xl px-3 bg-white focus-within:ring-2 focus-within:ring-amber-400/40 focus-within:border-amber-400 transition-colors"
          style={{ height: 46 }}
        />
        {cardNumberError && <p className="mt-1 text-xs text-red-500">{cardNumberError}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Expiration</label>
          <div
            id="mp-expiration"
            className="w-full border border-gray-200 rounded-xl px-3 bg-white focus-within:ring-2 focus-within:ring-amber-400/40 focus-within:border-amber-400 transition-colors"
            style={{ height: 46 }}
          />
          {expirationError && <p className="mt-1 text-xs text-red-500">{expirationError}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Security code</label>
          <div
            id="mp-security-code"
            className="w-full border border-gray-200 rounded-xl px-3 bg-white focus-within:ring-2 focus-within:ring-amber-400/40 focus-within:border-amber-400 transition-colors"
            style={{ height: 46 }}
          />
          {securityCodeError && <p className="mt-1 text-xs text-red-500">{securityCodeError}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name on card</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => { setCardholderName(e.target.value); setNameError(''); }}
          placeholder="Maria Lopez"
          className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-colors"
          autoComplete="cc-name"
          disabled={busy}
        />
        {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
      </div>

      {!ready && (
        <div className="flex items-center justify-center py-2 gap-2 text-muted text-xs">
          <Loader2 size={14} className="animate-spin text-amber-400" />
          Initializing secure fields...
        </div>
      )}

      <button
        type="submit"
        disabled={busy || !ready}
        className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-2"
      >
        {busy ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Lock size={15} />
        )}
        {busy ? 'Processing...' : 'Pay $19 USD'}
      </button>
    </form>
  );
}

const fieldStyle = {
  color: '#1e293b',
  fontSize: '14px',
  fontFamily: 'inherit',
  placeholderColor: '#9ca3af',
};
