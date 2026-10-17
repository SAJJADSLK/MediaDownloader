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
      if (typeof window !== 'undefined') {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch {
      // Silently ignore adsbygoogle push attempts before external script loads
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-3811332485680799';

  return (
    <div
      className={`mx-auto w-full my-6 text-center overflow-hidden flex flex-col items-center justify-center ${className}`}
      aria-label="Advertisement"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '1px' }}
        data-ad-client={clientId}
        {...(slotId ? { 'data-ad-slot': slotId } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

