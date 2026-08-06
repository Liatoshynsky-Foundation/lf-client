export interface ContactEmailData {
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
  formType?: string;
}

export function generateContactEmail(data: ContactEmailData): { html: string; text: string } {
  const { name, email, phoneNumber, message, formType = 'Contact' } = data;

  const phoneNumberField = phoneNumber
    ? `
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${phoneNumber}</div>
              </div>`
    : '';

  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New ${formType} Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>${phoneNumberField}
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replaceAll('\n', '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the website ${formType.toLowerCase()} form.</p>
              <p>Sent at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

  const text = `
New ${formType} Form Submission

Name: ${name}
Email: ${email}
${phoneNumber ? `Phone Number: ${phoneNumber}` : ''}
Message: ${message}

Sent at: ${new Date().toLocaleString()}
    `.trim();

  return { html, text };
}
