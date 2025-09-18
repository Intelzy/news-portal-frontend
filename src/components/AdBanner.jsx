"use client";

import { useEffect } from 'react';

export default function AdBanner({
  "data-ad-client": dataAdClient,
  "data-ad-slot": dataAdSlot,
  "data-ad-layout": dataAdLayout,
  "data-ad-format": dataAdFormat = "auto",
  "data-full-width-responsive": dataFullWidthResponsive = "true",
  className = ""
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        data-ad-layout={dataAdLayout}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      ></ins>
    </div>
  );
}