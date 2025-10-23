import React from 'react';

import TermsOfUse from '~/components/blocks/terms-of-use/TermsOfUse';

import { createSeoMeta } from '~/utils/createSeoMeta';

import MainLayout from '~/layouts/main-layout/MainLayout';

export const metadata = createSeoMeta({
  title: 'Умови користування сайтом',
  description:
    'Дізнайтесь про правила користування сайтом Фундації Лятошинського, включно з доступом до матеріалів та обов’язками користувачів.',
  url: '/terms'
});

export default function Terms() {
  return (
    <MainLayout withLines>
      <TermsOfUse />
    </MainLayout>
  );
}
