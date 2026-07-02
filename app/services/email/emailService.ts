import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

import { generateCollaborationEmail } from './emails/emails';

import logger from '~/middleware/logger/logger';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter | null = null;

  private async getTransporter(): Promise<Transporter> {
    if (this.transporter) return this.transporter;

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    return this.transporter;
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean }> {
    try {
      const transporter = await this.getTransporter();

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Фундація Лятошинського" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      });

      return { success: true };
    } catch (error) {
      logger.error('[EmailService] Critical error during email dispatch:', error);
      return { success: false };
    }
  }

  async sendCollaborationEmail(data: {
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
  }): Promise<{ success: boolean }> {
    const { html, text } = generateCollaborationEmail(data);

    return this.sendEmail({
      // TODO: REMOVE THAT CODE: Temporary using env variable. Once the contact form collection is ready in MongoDB,
      // create a dedicated function to fetch this email string from the database and use it here.
      to: process.env.CONTACT_EMAIL || 'liatoshynsky@gmail.com',
      subject: `New Collaboration Request from ${data.name}`,
      html,
      text
    });
  }
}

export const emailService = new EmailService();
