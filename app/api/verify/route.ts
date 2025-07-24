export async function POST(request: Request) {
  const { token } = await request.json();

  const secretKey = process.env.TURNSTILE_SECRET_KEY!;
  const verifyURL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  console.log({ secretKey });

  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  const result = await fetch(verifyURL, {
    method: 'POST',
    body: formData
  });

  const data = await result.json();

  if (data.success) {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false, errors: data['error-codes'] }, { status: 400 });
  }
}
