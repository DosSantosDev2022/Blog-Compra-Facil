// components/ui/CookieConsentBanner.tsx
'use client';

import React from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/'; // Reutilizando seu componente Button

const CookieConsentBanner = () => {
  const { hasConsent, giveConsent } = useCookieConsent();

  // Se hasConsent for null (ainda não verificou) ou true (já aceitou), não renderiza o banner.
  if (hasConsent === null || hasConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-lg z-[9999]">
      <p className="text-sm mb-3 md:mb-0 md:mr-4 text-center md:text-left">
        Este site utiliza cookies para garantir que você tenha a melhor experiência. Ao continuar navegando, você concorda com o uso de cookies. Para mais informações, consulte nossa{' '}
        <a href="/privacyPolicy" className="underline hover:text-blue-300">
          Política de Privacidade
        </a>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variants='primary'
          onClick={giveConsent}
        >
          Aceitar
        </Button>
        {/* Opcional: Adicionar um botão para "Gerenciar Cookies" que poderia levar para uma página de preferências */}
        {/* <Button
          onClick={() => alert('Implementar gerenciamento de cookies')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
        >
          Gerenciar
        </Button> */}
      </div>
    </div>
  );
};

export { CookieConsentBanner };