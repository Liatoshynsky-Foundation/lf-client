import { generateContactEmail } from './emails';

describe('Email Generators', () => {
  const mockData = {
    name: 'Ivan',
    email: 'test@test.com',
    message: 'Hello\nWorld'
  };

  describe('generateContactEmail', () => {
    it('should use default formType if not provided', () => {
      const res = generateContactEmail(mockData);
      expect(res.html).toContain('New Contact Form Submission');
    });

    it('should use custom formType', () => {
      const res = generateContactEmail({ ...mockData, formType: 'Support' });
      expect(res.html).toContain('New Support Form Submission');
    });

    it('should include phone number field when phoneNumber is provided', () => {
      const res = generateContactEmail({ ...mockData, phoneNumber: '+380991234567' });
      expect(res.html).toContain('Phone Number:');
      expect(res.html).toContain('+380991234567');
      expect(res.text).toContain('Phone Number: +380991234567');
    });

    it('should NOT include phone number field when phoneNumber is missing', () => {
      const res = generateContactEmail(mockData);
      expect(res.html).not.toContain('Phone Number:');
      expect(res.text).not.toContain('Phone Number:');
    });
  });
});
