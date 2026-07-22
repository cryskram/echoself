import { transporter } from "./email";

export async function sendEchoEmail({
  email,
  image,
  genre,
  shareUrl,
}: {
  email: string;
  image: string;
  genre: string;
  shareUrl: string;
}) {
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself/${image}`;

  return transporter.sendMail({
    from: `"EchoSelf" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🎵 Your ${genre.charAt(0).toUpperCase() + genre.slice(1)} Echo is Ready`,
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px;">
<tr>
<td align="center">

<table role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
max-width:600px;
background:#ffffff;
border-radius:20px;
overflow:hidden;
">

<tr>
<td
align="center"
style="
background:#111827;
padding:36px 24px;
">

<h1 style="
margin:0;
font-size:34px;
line-height:1.2;
font-weight:800;
color:#ffffff;
">

Echo<span style="
background:#ffffff;
color:#111827;
padding:3px 10px;
border-radius:8px;
margin-left:4px;
display:inline-block;
">

Self

</span>

</h1>

<p style="
margin:16px 0 0;
font-size:17px;
line-height:1.6;
color:#d1d5db;
">

Your personalized Echo is ready.

</p>

</td>
</tr>

<tr>
<td style="padding:28px;">

<img
src="${imageUrl}"
alt="EchoSelf Album"
style="
display:block;
width:100%;
max-width:100%;
height:auto;
border-radius:18px;
"
/>

<div style="
margin-top:24px;
display:inline-block;
background:#111827;
color:#ffffff;
padding:8px 16px;
border-radius:999px;
font-size:13px;
font-weight:bold;
text-transform:uppercase;
letter-spacing:.08em;
">

${genre}

</div>

<h2 style="
margin:18px 0 12px;
font-size:28px;
line-height:1.3;
color:#111827;
">

Your ${genre.charAt(0).toUpperCase() + genre.slice(1)} Echo is Ready

</h2>

<p style="
margin:0;
font-size:16px;
line-height:1.8;
color:#52525b;
">

Your AI-generated album artwork and soundtrack are waiting for you.

Open your Echo to listen, download your album cover, and share it with your friends.

</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
<tr>
<td align="center">

<a
href="${shareUrl}"
style="
background:#111827;
color:#ffffff;
text-decoration:none;
padding:16px 30px;
border-radius:12px;
display:inline-block;
font-size:16px;
font-weight:bold;
">

🎵 Open My Echo

</a>

</td>
</tr>
</table>

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-top:32px;
background:#f8fafc;
border:1px solid #e5e7eb;
border-radius:14px;
">

<tr>
<td
style="
padding:24px;
font-size:15px;
line-height:2;
color:#52525b;
"
>

<strong style="color:#111827;">
Inside your Echo
</strong>

<br><br>

🎵 Listen to your soundtrack

<br>

🖼 Download your album cover

<br>

📤 Share it on social media

<br>

🏷 Tag ICWITE 2026, IEEE WIE Bangalore Section, IEEE Computer Society Bangalore Chapter and IEEE Bangalore Section

</td>
</tr>

</table>

</td>
</tr>

<tr>
<td
align="center"
style="
padding:30px 24px;
background:#fafafa;
border-top:1px solid #e5e7eb;
"
>

<p style="
margin:0;
font-size:15px;
line-height:1.8;
color:#6b7280;
">

Every Echo is uniquely yours.

</p>

<p style="
margin:18px 0 0;
font-size:22px;
font-weight:800;
color:#111827;
">

Echo<span style="
background:#111827;
color:#ffffff;
padding:2px 10px;
border-radius:8px;
margin-left:4px;
display:inline-block;
">

Self

</span>

</p>

<p style="
margin:18px 0 0;
font-size:13px;
color:#9ca3af;
">

See yourself. Hear yourself.

</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
  });
}
