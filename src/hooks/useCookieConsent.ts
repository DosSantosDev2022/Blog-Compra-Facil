// hooks/useCookieConsent.ts
'use client'; // Marque como Client Component

import { useEffect, useState } from 'react';

const COOKIE_CONSENT_KEY = 'onetec_cookie_consent';

export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null); // null significa que ainda não verificamos

  useEffect(() => {
    // Verifica o localStorage apenas no cliente
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      setHasConsent(consent === 'true'); // 'true' como string no localStorage
    }
  }, []);

  const giveConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
      setHasConsent(true);
    }
  };

  const revokeConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'false');
      setHasConsent(false);
      // Aqui você poderia adicionar lógica para desativar cookies analíticos, etc.
    }
  };

  return { hasConsent, giveConsent, revokeConsent };
};