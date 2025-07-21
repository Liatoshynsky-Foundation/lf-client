import { z } from 'zod';

import { bulletedListElementSchema } from './bulletedList.schema';
import { imageElementSchema } from './image.schema';
import { paragraphElementSchema } from './paragraph.schema';
import { quoteElementSchema } from './quote.schema';

import { headingSchema } from '~/validators/page/elements/heading.schema';
import { titledListElementSchema } from '~/validators/page/elements/titledList.schema';

export const anyElementSchema = z.discriminatedUnion('elementType', [
  paragraphElementSchema,
  imageElementSchema,
  quoteElementSchema,
  bulletedListElementSchema,
  headingSchema,
  titledListElementSchema
]);

export type AnyElement = z.infer<typeof anyElementSchema>;
