import z from 'zod';

import { LocalizationErrors } from '~/constants/errors';
import { Result, WrapError, WrapSuccess } from '~/types/types/result';

export function catchMissingTranslations<T>(schema: z.ZodType<T>, value: unknown): Result<T> {
  try {
    return WrapSuccess(schema.parse(value));
  } catch (err) {
    if (err instanceof z.ZodError) {
      const issues = err.errors as { message: string; path: (string | number)[] }[];

      const hasMessage = (msg: string) => issues.some((i) => i.message === msg);

      if (hasMessage(LocalizationErrors.MISSING_UK_ERROR)) {
        return WrapError(LocalizationErrors.MISSING_UK_ERROR);
      }

      const nodeIssues = issues.filter((i) => i.message === LocalizationErrors.MISSING_NODE_ERROR);
      if (nodeIssues.length > 0) {
        const pathIncludes = (locale: string) => nodeIssues.some((i) => i.path.map(String).join('.').includes(locale));

        if (pathIncludes('uk')) return WrapError(LocalizationErrors.MISSING_UK_ERROR);
        if (pathIncludes('en')) return WrapError(LocalizationErrors.MISSING_EN_ERROR);
      }

      if (hasMessage(LocalizationErrors.MISSING_EN_ERROR)) {
        return WrapError(LocalizationErrors.MISSING_EN_ERROR);
      }

      return WrapError('Validation error:\n' + err.message);
    }
    return WrapError('Unexpected error during parsing:\n' + (err instanceof Error ? err.message : String(err)));
  }
}
