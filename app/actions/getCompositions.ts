'use server';

import { createRequestContainer } from '~/di/container';

export async function getCompositions(lang: string, search?: string) {
  return await createRequestContainer().resolve('artistryService').getAllCompositions(lang, search);
}
