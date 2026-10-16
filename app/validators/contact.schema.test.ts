import { contactApiSchema } from './contact.schema';

describe('contactApiSchema', () => {
  const validContact = {
    name: 'Vlad Ivanov',
    email: 'vlad@gmail.com',
    phoneNumber: '+380631234567',
    message: 'This is a valid test message.',
    policy: true
  };

  it.each([
    ['local part exceeds 64 characters', `${'a'.repeat(65)}@gmail.com`],
    ['domain label exceeds 63 characters', `test@${'a'.repeat(64)}.com`],
    [
      'total email length exceeds 254 characters',
      `${'a'.repeat(64)}@${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(62)}`
    ],
    ['email contains an empty domain label', 'test@gmail..com'],
    ['email contains multiple @ symbols', 'test@@gmail.com']
  ])('should reject email when %s', (_, email) => {
    expect(contactApiSchema.safeParse({ ...validContact, email }).success).toBe(false);
  });

  it('should accept an email with a 64-character local part', () => {
    const email = `${'a'.repeat(64)}@gmail.com`;
    expect(contactApiSchema.safeParse({ ...validContact, email }).success).toBe(true);
  });

  it.each([
    ['name is shorter than 2 characters', { name: 'A' }],
    ['name exceeds 50 characters after normalization', { name: `${'A'.repeat(49)}   B` }],
    ['phone number is invalid', { phoneNumber: 'invalid-phone' }],
    ['message is shorter than 10 characters after trimming', { message: '   short   ' }],
    ['message exceeds 1000 characters', { message: 'a'.repeat(1001) }],
    ['privacy policy is not accepted', { policy: false }]
  ])('should reject contact when %s', (_, data) => {
    expect(contactApiSchema.safeParse({ ...validContact, ...data }).success).toBe(false);
  });

  it('should normalize the name and accept exactly 50 characters', () => {
    const result = contactApiSchema.safeParse({
      ...validContact,
      name: `${'A'.repeat(25)}   ${'B'.repeat(24)}`
    });

    expect(result.success).toBe(true);
  });

  it('should accept an omitted optional phone number', () => {
    const contact = {
      name: validContact.name,
      email: validContact.email,
      message: validContact.message,
      policy: validContact.policy
    };
    expect(contactApiSchema.safeParse(contact).success).toBe(true);
  });
});
