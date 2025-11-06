export const lengths = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_NUMBER_MAX_LENGTH: 16,
  PHONE_NUMBER_MIN_LENGTH: 11,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000
};

export const regex = {
  EMAIL_PATTERN: /^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i,
  PHONE_NUMBER_PATTERN: /^\+\d+$/
};
