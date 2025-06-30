import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

export function createIconButtonStyleClasses(variant: IconButtonColorVariant, type: IconButtonVariant) {
  let styleClasses = variant as string;
  if (
    type !== IconButtonVariant.filled &&
    (variant === IconButtonColorVariant.Primary || variant === IconButtonColorVariant.Secondary)
  ) {
    styleClasses += type.charAt(0).toUpperCase() + type.slice(1);
  }
  return styleClasses;
}
