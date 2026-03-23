import { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export default function InstallBanner() {
  const { deferredPrompt, install, isInstalled, isIOS } = useInstallPrompt();
  const [showTip, setShowTip] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('install_banner_dismissed') === '1'
  );

  if (isInstalled || dismissed) return null;

  return (
    <div className="mt-4 p-4 rounded-card-lg border border-teal/30 bg-teal/5 flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Download size={14} className="text-teal" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-navy">Add app to your home screen</p>
        <p className="text-xs text-muted mt-0.5 leading-relaxed">
          Install the app for quick access — no browser bar, faster loading.
        </p>
        <div className="relative inline-block mt-2">
          <button
            onClick={async () => {
              if (deferredPrompt) {
                await install();
              } else {
                setShowTip(!showTip);
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-teal text-white text-xs font-semibold hover:bg-teal/90 transition-colors flex items-center gap-1.5"
          >
            <Download size={12} />
            Download App
          </button>

          {showTip && (
            <div className="absolute left-0 mt-2 w-64 bg-white text-navy rounded-xl shadow-2xl p-4 text-sm z-10 border border-gray-100">
              <button
                onClick={() => setShowTip(false)}
                className="absolute top-2 right-3 text-navy/40 hover:text-navy text-lg leading-none"
              >
                &times;
              </button>
              {isIOS ? (
                <>
                  <p className="font-semibold mb-2">Install on iPhone / iPad</p>
                  <p className="text-navy/70 leading-relaxed">
                    Tap <Share size={13} className="inline mx-0.5 text-blue-500" /> <strong>Share</strong> in Safari, then tap <strong>"Add to Home Screen"</strong>
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold mb-2">Install on Android</p>
                  <p className="text-navy/70 leading-relaxed">
                    Tap the <strong>3-dot menu</strong> in Chrome, then tap <strong>"Add to Home Screen"</strong>
                  </p>
                </>
              )}
              <div className="absolute -top-2 left-6 w-3 h-3 bg-white rotate-45 rounded-sm border-l border-t border-gray-100" />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          setDismissed(true);
          localStorage.setItem('install_banner_dismissed', '1');
        }}
        className="text-muted hover:text-navy transition-colors flex-shrink-0 mt-0.5"
      >
        <X size={15} />
      </button>
    </div>
  );
}
