"use client";

import { useEffect, useRef } from 'react';

export default function AdBanner({
  className = "",
  style = {},
  ...props
}) {
  const adRef = useRef(null);
  
  // --- THIS IS THE FIX ---
  // We use a ref to create a flag that persists across re-renders
  // without causing the component to update.
  const adPushed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          
          // Only push the ad if our flag is false.
          if (!adPushed.current) {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              // Set the flag to true so this code never runs again for this component.
              adPushed.current = true;
            } catch (err) {
              console.error("AdSense push error:", err);
            }
          }
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current);
      }
    };
  }, []); // The empty dependency array ensures this effect runs only on mount.

  return (
    <div className={className} style={{ ...style, minHeight: '50px', overflow: 'hidden', textAlign: 'center' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        {...props}
      ></ins>
    </div>
  );
}