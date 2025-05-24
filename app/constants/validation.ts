export const lengths = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
};

export const regex = {
  EMAIL_PATTERN:
    /^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i,
};

export const error = {
  NAME_ERROR: `Name must be a string between ${lengths.NAME_MIN_LENGTH} and ${lengths.NAME_MAX_LENGTH} characters long.`,
  EMAIL_ERROR: 'Invalid email address.',
  MESSAGE_ERROR: `Message must be a string between ${lengths.MESSAGE_MIN_LENGTH} and ${lengths.MESSAGE_MAX_LENGTH} characters.`,
};
