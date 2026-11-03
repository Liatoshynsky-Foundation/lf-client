import { redirect } from 'next/navigation';

import { SearchParams } from '~/types/types/language';

export function redirectToDisablePreview(pathname: string, searchParams: SearchParams) {
  const returnToParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === 'draftId' || value === undefined) {
      continue;
    }

    const values = Array.isArray(value) ? value : [value];

    for (const item of values) {
      returnToParams.append(key, item);
    }
  }
  const query = returnToParams.toString();
  const returnTo = query ? `${pathname}?${query}` : pathname;
  const redirectParams = new URLSearchParams({ returnTo });

  redirect(`/api/preview/disable?${redirectParams.toString()}`);
}
