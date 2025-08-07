import React, { ReactElement } from 'react';

import ResearchAndScientificWork from '~/components/research-and-scientific-work/ResearchAndScientificWork';

import { workTableMock } from './WorksTable/WorkTable.constants';
import WorkTableSection from './WorksTable/WorkTableSelection';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';

export const metadata = createSeoMeta({
  title: 'Дослідження та наукові роботи - Фундація Лятошинського',
  description: 'Ознайомтесь з дослідженнями та науковими роботами Бориса Лятошинського.',
  url: '/research'
});

export default function Research(): ReactElement {
  return (
    <>
      <ResearchAndScientificWork />
      <WorkTableSection data={workTableMock} />
    </>
  );
}