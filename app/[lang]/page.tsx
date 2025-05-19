'use client';
import React, { ReactElement, use, useEffect } from 'react';

export default function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}): ReactElement {
  const { lang } = use(params);

  useEffect(() => {
    console.log({ lang });
  }, [lang]);

  return (
    <>
      <h1>Liatoshynsky project</h1>
    </>
  );
}
