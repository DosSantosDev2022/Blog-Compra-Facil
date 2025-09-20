import { RichText } from '@/components/global';
import { defaultRenders } from '@/components/global/richTextRenders';
import { getPolicies } from '@/services/getPolicies';
import type { Metadata } from 'next';


const dominio = 'https://www.ontech.blog/privacyPolicy'

export const metadata: Metadata = {
  title: 'Política de Privacidade - OnTech Blog',
  description: 'Conheça nossa política de privacidade e como tratamos seus dados.',
  // Você pode adicionar mais metadados Open Graph aqui para redes sociais
  openGraph: {
    title: 'Política de Privacidade - OnTech Blog',
    description: 'Conheça nossa política de privacidade e como tratamos seus dados.',
    url: dominio,
    siteName: 'OnTech Blog',
    images: [
      {
        url: dominio, // Opcional: imagem para redes sociais
        width: 800,
        height: 600,
      },
    ],
  },
  robots: {
    index: true, // Permite que motores de busca indexem esta página
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-snippet': -1,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: dominio,
  },
};

const PrivacyPolicyPage = async () => {

  const { privacyPolicy } = await getPolicies()

  return (
    <main className="container mx-auto p-8 pt-28 max-w-5xl">
      <RichText
        content={privacyPolicy.content.raw}
        renderers={defaultRenders}
      />
    </main>
  );
};

export default PrivacyPolicyPage;