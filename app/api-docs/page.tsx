'use client';

import dynamic from 'next/dynamic';

const RedocStandalone = dynamic(() => import('redoc').then((mod) => mod.RedocStandalone), { ssr: false });

export default function ApiDocs() {
  return <RedocStandalone specUrl="/api/docs" />;
}
