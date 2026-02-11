import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

import { generateCollaborationEmail, generateContactEmail } from './emails/emails';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter | null = null;

  private async getTransporter(): Promise<Transporter> {
    if (this.transporter) {
      return this.transporter;
    }

    // For development, use Ethereal Email. In production, use SMTP settings from environment variables.
    const testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    // Use this code for production with SMTP settings
    // if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    //   this.transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: Number.parseInt(process.env.SMTP_PORT, 10),
    //     secure: process.env.SMTP_SECURE === 'true',
    //     auth: process.env.SMTP_USER
    //       ? {
    //           user: process.env.SMTP_USER,
    //           pass: process.env.SMTP_PASSWORD || ''
    //         }
    //       : undefined
    //   });
    // } else if (process.env.NODE_ENV === 'development') {
    //   const testAccount = await nodemailer.createTestAccount();
    //   this.transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: testAccount.user,
    //       pass: testAccount.pass
    //     }
    //   });
    // } else {
    //   throw new Error('Email configuration is missing. Please set SMTP environment variables.');
    // }

    return this.transporter;
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; previewUrl?: string }> {
    try {
      const transporter = await this.getTransporter();

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Website Contact" <noreply@example.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      });

      const previewUrl = process.env.NODE_ENV === 'development' ? nodemailer.getTestMessageUrl(info) : undefined;

      if (previewUrl) {
        // eslint-disable-next-line no-console
        console.log('Preview URL: %s', previewUrl);
      }

      return {
        success: true,
        messageId: info.messageId,
        previewUrl: previewUrl || undefined
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending email:', error);
      return { success: false };
    }
  }

  async sendCollaborationEmail(data: {
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
  }): Promise<{ success: boolean; messageId?: string; previewUrl?: string }> {
    const { name } = data;
    const { html, text } = generateCollaborationEmail(data);

    return this.sendEmail({
      to: process.env.CONTACT_EMAIL || 'contact@example.com',
      subject: `New Collaboration Request from ${name}`,
      html,
      text
    });
  }

  async sendContactEmail(data: {
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
    formType?: string;
  }): Promise<{ success: boolean; messageId?: string; previewUrl?: string }> {
    const { name, formType = 'Contact' } = data;
    const { html, text } = generateContactEmail(data);

    return this.sendEmail({
      to: process.env.CONTACT_EMAIL || 'contact@example.com',
      subject: `New ${formType} Form from ${name}`,
      html,
      text
    });
  }
}

export const emailService = new EmailService();
