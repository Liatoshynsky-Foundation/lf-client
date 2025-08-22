export type Variant = 'goals' | 'whatWeDo';

export type TitleWithDescriptionProps = {
  variant: Variant;
  title: string;
  description?: string | React.ReactNode;
};
