import { useCallback, useEffect, useState } from "react";

/**
 * GDPR-compliant cookie consent state.
 *
 * Bump CONSENT_VERSION when the privacy/cookies policy materially changes —
 * existing users will be shown the banner again to re-consent.
 *
 * Version history:
 *   v1 — initial release with Yext Analytics (consent-gated)
 */
export const CONSENT_VERSION = 1;
const STORAGE_KEY = "tb-bilar:consent";

export type ConsentStatus = "accepted" | "rejected" | "unset";

type StoredConsent = {
  status: Exclude<ConsentStatus, "unset">;
  version: number;
  timestamp: number;
};

function readStored(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed || typeof parsed.version !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(status: Exclude<ConsentStatus, "unset">): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredConsent = {
      status,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* localStorage disabled (private mode, quota); fall through */
  }
}

export function useConsent() {
  const [status, setStatus] = useState<ConsentStatus>("unset");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = readStored();
    if (stored && stored.version === CONSENT_VERSION) {
      setStatus(stored.status);
    } else {
      setStatus("unset");
    }
  }, []);

  const accept = useCallback(() => {
    writeStored("accepted");
    setStatus("accepted");
  }, []);

  const reject = useCallback(() => {
    writeStored("rejected");
    setStatus("rejected");
  }, []);

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
    setStatus("unset");
  }, []);

  return { status, mounted, accept, reject, reset };
}
