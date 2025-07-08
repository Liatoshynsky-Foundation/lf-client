import { z } from 'zod';

export const zFolderNameSchema = z.enum(['photos', 'notes', 'compositions', 'works']);
export const zContentTypeSchema = z.enum([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'text/plain',
  'application/json',
  'audio/mpeg',
  'audio/wav',
  'video/mp4'
]);
export const zBlobQuerySchema = z.object({
  blobName: z.string().min(1),
  folderName: zFolderNameSchema
});
