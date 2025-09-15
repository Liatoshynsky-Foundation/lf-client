import React from 'react';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import TermsOfUse from '~/shared/components/blocks/terms-of-use/TermsOfUse';

export const metadata = createSeoMeta({
  title: 'Умови користування сайтом',
  description:
    'Дізнайтесь про правила користування сайтом Фундації Лятошинського, включно з доступом до матеріалів та обов’язками користувачів.',
  url: '/terms'
});

export default function Terms() {
  return <TermsOfUse />;
}
