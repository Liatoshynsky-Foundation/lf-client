import { SocialMediaTypes } from '~/types/enums/common.enums';

export function sanitizeSocialMediaType(value: string): SocialMediaTypes {
  value = value.toLocaleLowerCase();
  if (Object.values(SocialMediaTypes).includes(value as SocialMediaTypes)) {
    return value as SocialMediaTypes;
  }
  return SocialMediaTypes.AnotherMedia;
}
