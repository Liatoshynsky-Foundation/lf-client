import { z } from 'zod';

import { zFolderNameSchema } from '~/validators/blob.schema';

export const zBlobQuerySchema = z.object({
  blobName: z.string().min(1),
  folderName: zFolderNameSchema
});

export const zPageQuerySchema = z.object({
  pageName: z.string().min(1),
  lang: z.enum(['en', 'uk'])
});
