import nodemailer from 'nodemailer';

import { emailService } from './emailService';

import logger from '~/middleware/logger/logger';

jest.mock('nodemailer');

describe('EmailService', () => {
  const originalEnv = process.env.NODE_ENV;
  const mockTransporter = {
    sendMail: jest.fn().mockResolvedValue({ messageId: '123' })
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);
    (nodemailer.createTestAccount as jest.Mock).mockResolvedValue({ user: 'u', pass: 'p' });
    (nodemailer.getTestMessageUrl as jest.Mock).mockReturnValue('https://preview.com');
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv });
  });

  describe('sendEmail core logic', () => {
    it('should send email successfully and cover lines 79-81 (dev mode)', async () => {
      const envSpy = jest.replaceProperty(process, 'env', {
        ...process.env,
        NODE_ENV: 'development'
      });

      const spyLog = jest.spyOn(console, 'log').mockImplementation();

      (nodemailer.getTestMessageUrl as jest.Mock).mockReturnValue('https://preview.com');

      const res = await emailService.sendEmail({
        to: 'test@example.com',
        subject: 'Subject',
        html: '<b>Body</b>'
      });

      expect(res.success).toBe(true);
      expect(res.previewUrl).toBe('https://preview.com');
      expect(spyLog).toHaveBeenCalledWith('Preview URL: %s', 'https://preview.com');

      spyLog.mockRestore();
      envSpy.restore();
    });
    it('should handle sendMail error (catch block coverage)', async () => {
      mockTransporter.sendMail.mockRejectedValueOnce(new Error('SMTP error'));

      const spyError = jest.spyOn(logger, 'error').mockImplementation();

      const res = await emailService.sendEmail({ to: 'a@a.com', subject: 's', html: 'h' });

      expect(res.success).toBe(false);
      expect(spyError).toHaveBeenCalledWith(expect.stringContaining('Critical error'), expect.any(Error));

      spyError.mockRestore();
    });
    it('should reuse transporter if it exists (singleton coverage)', async () => {
      (emailService as any).transporter = null;

      await emailService.sendEmail({ to: '1@test.com', subject: 's', html: 'h' });
      await emailService.sendEmail({ to: '2@test.com', subject: 's', html: 'h' });

      expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    });
  });

  describe('Specific email methods', () => {
    const mockData = {
      name: 'Ivan',
      email: 'ivan@test.com',
      message: 'Hello!',
      phoneNumber: '123456'
    };

    it('should cover sendCollaborationEmail', async () => {
      const res = await emailService.sendCollaborationEmail(mockData);
      expect(res.success).toBe(true);
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining('Ivan')
        })
      );
    });

    it('should cover sendContactEmail with custom formType', async () => {
      const res = await emailService.sendContactEmail({
        ...mockData,
        formType: 'Support'
      });
      expect(res.success).toBe(true);
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining('Support')
        })
      );
    });
  });
});
