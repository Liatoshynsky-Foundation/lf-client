import { z } from 'zod';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

type LocalizedTipTapDoc = z.infer<typeof TipTapDocSchema>;

export const mockLocalizedTipTapDoc = (text: string): LocalizedTipTapDoc =>
  makeDoc([normalText(text)]) as unknown as LocalizedTipTapDoc;
