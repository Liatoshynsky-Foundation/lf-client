import { z } from 'zod';

const nameRegex = /^[\p{L}'’ -]+$/u;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const contactApiSchema = z.object({
  name: z
    .string()
    .transform((val) => val.trim().replace(/\s+/g, ' '))
    .pipe(z.string().min(2).max(50).regex(nameRegex)),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Invalid phone format'
    }),
  message: z.string().trim().min(10).max(1000),
  policy: z.literal(true)
});
