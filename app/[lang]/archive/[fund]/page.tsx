'use client';
import { useParams } from 'next/navigation';

import MainLayout from '~/layouts/main-layout/MainLayout';

export default function FundDetailsPage() {
  const { fund: fundId } = useParams();
  return <MainLayout>{fundId}</MainLayout>;
}
