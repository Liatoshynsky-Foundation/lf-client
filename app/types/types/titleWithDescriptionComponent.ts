import { TipTapDoc } from './tiptap.types';

export type Variant = 'goals' | 'whatWeDo';

export type TitleWithDescriptionProps = {
  variant: Variant;
  title: TipTapDoc | string;
  description?: TipTapDoc | string;
  dataTestId?: string;
};
