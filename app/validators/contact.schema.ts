import { z } from 'zod';

export const nameRegex = /^[\p{L}'’ -]+$/u;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const normalizeNameSpaces = (value: string) => value.trim().replace(/\s+/g, ' ');

export const hasValidEmailParts = (value: string) => {
  const emailParts = value.split('@');

  if (emailParts.length !== 2) return false;

  const localPart = emailParts[0];
  const domainPart = emailParts[1];
  const domainLabels = domainPart.split('.');

  return (
    value.length <= 254 &&
    localPart.length <= 64 &&
    domainPart.length <= 255 &&
    domainLabels.every((label) => label.length >= 1 && label.length <= 63)
  );
};

export const contactApiSchema = z.object({
  name: z.string().transform(normalizeNameSpaces).pipe(z.string().min(2).max(50).regex(nameRegex)),
  email: z
    .string()
    .trim()
    .email()
    .refine((value) => !value.includes('-.') && !value.endsWith('-'), {
      message: 'Invalid email format'
    })
    .refine(hasValidEmailParts, { message: 'Invalid email format' }),
  phoneNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Invalid phone format'
    }),
  message: z.string().trim().min(10).max(1000),
  policy: z.literal(true),
  formType: z.string().trim().optional()
});
