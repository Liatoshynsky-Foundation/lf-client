import { SearchParams } from '~/types/types/language';

export function getDraftId(searchParams?: SearchParams): string | undefined {
  const value = searchParams?.draftId;
  const draftId = Array.isArray(value) ? value[0] : value;
  return draftId;
}
