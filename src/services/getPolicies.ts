import { HygraphQuery } from '@/app/api/cms/hygraph';
import type { RichTextContent } from '@graphcms/rich-text-types';


export type PrivacyPolicy = {
  content: {
    raw: RichTextContent;
  };
};

export type PrivacyPolicyResponse = {
  privacyPolicy: PrivacyPolicy;
};


export async function getPolicies(): Promise<PrivacyPolicyResponse> {
  const query = `
    query MyQuery {
      privacyPolicy(where: {slug: "policy-privacy"}) {
        content {
          raw
        }
      }
    }
  `;

  const {privacyPolicy} = await HygraphQuery<PrivacyPolicyResponse>(query, {
    revalidate: 60 * 60 * 24 * 30, // revalida a cada 30 dias
  });

  if (!privacyPolicy) {
    throw new Error('No privacy policies found');
  }

  return  {privacyPolicy}
}
