"use client";

import { useEffect } from "react";

const SESSION_KEY = "visit-notified";
const OPT_OUT_KEY = "visit-notify-opt-out";

/**
 * Pings /api/visit once per browser session so the owner gets a push notification.
 * Open the site once with ?notrack to stop notifications from your own browser
 * (?track turns them back on).
 */
export function VisitBeacon() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("notrack")) localStorage.setItem(OPT_OUT_KEY, "1");
      if (params.has("track")) localStorage.removeItem(OPT_OUT_KEY);
      if (localStorage.getItem(OPT_OUT_KEY) || sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage can be blocked (private mode); still send at most once per page load.
    }

    const payload = JSON.stringify({
      path: window.location.pathname + window.location.hash,
      referrer: document.referrer,
      lang: navigator.language,
    });
    const sent = navigator.sendBeacon?.("/api/visit", new Blob([payload], { type: "application/json" }));
    if (!sent) {
      fetch("/api/visit", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  }, []);

  return null;
}
