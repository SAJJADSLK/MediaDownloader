'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'banner';
  className?: string;
}

export function AdUnit({ slotId, format = 'horizontal', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate push in React strict mode
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined' && slotId) {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (e) {
      // Ignore adsbygoogle duplicate push errors
      console.debug('AdSense script initialization:', e);
    }
  }, [slotId]);

  // Height presets to prevent Cumulative Layout Shift (CLS)
  const formatClasses = {
    horizontal: 'min-h-[100px] sm:min-h-[120px] max-w-4xl',
    rectangle: 'min-h-[250px] max-w-[300px]',
    banner: 'min-h-[90px] max-w-5xl',
  };

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-3811332485680799';

  return (
    <div
      className={`mx-auto w-full my-8 ${formatClasses[format]} ${className}`}
      aria-label="Advertisement"
    >
      <div className="w-full h-full bg-white/[0.02] border border-dashed border-white/[0.08] rounded-2xl flex flex-col items-center justify-center p-3 text-center overflow-hidden">
        <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold mb-1">
          Advertisement
        </span>

        {slotId ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="text-xs text-neutral-500 flex flex-col items-center gap-1">
            <span className="text-neutral-400 font-medium">AdSense Placement Slot ({format})</span>
            <span className="text-[11px] text-neutral-600">Publisher: {clientId}</span>
          </div>
        )}
      </div>
    </div>
  );
}

