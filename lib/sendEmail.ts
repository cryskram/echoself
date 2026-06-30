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
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>

<body style="
margin:0;
padding:32px;
background:#f4f4f5;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
width="600"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:24px;
overflow:hidden;
box-shadow:0 12px 40px rgba(0,0,0,.08);
">

<tr>
<td
align="center"
style="
background:#111827;
padding:48px;
">

<h1 style="
margin:0;
font-size:40px;
font-weight:800;
color:white;
">

Echo<span style="
background:white;
color:#111827;
padding:4px 12px;
border-radius:10px;
margin-left:6px;
">

Self

</span>

</h1>

<p style="
margin-top:18px;
font-size:18px;
color:#d1d5db;
">

Your Echo is ready.

</p>

</td>
</tr>

<tr>
<td style="padding:40px;">

<img
src="${imageUrl}"
style="
width:100%;
border-radius:20px;
display:block;
box-shadow:0 8px 24px rgba(0,0,0,.15);
"
/>

<div
style="
display:inline-block;
margin:24px 0 8px;
padding:8px 16px;
background:#18181b;
color:white;
border-radius:999px;
font-size:13px;
font-weight:600;
letter-spacing:.08em;
text-transform:uppercase;
">

${genre}

</div>

<h2 style="
margin:12px 0;
font-size:30px;
color:#111827;
">

Your ${genre.charAt(0).toUpperCase() + genre.slice(1)} Echo is Ready

</h2>

<p style="
margin:0;
font-size:17px;
line-height:1.8;
color:#52525b;
">

Your personalized AI-generated album artwork and soundtrack are waiting for you.

Open your Echo to listen, download your album cover and share it with your friends.

</p>

<div style="
margin-top:36px;
text-align:center;
">

<a
href="${shareUrl}"
style="
display:inline-block;
padding:16px 36px;
background:#111827;
color:white;
text-decoration:none;
font-weight:700;
font-size:17px;
border-radius:14px;
">

🎵 Open My Echo

</a>

</div>

<table
width="100%"
style="
margin-top:36px;
background:#f8fafc;
border-radius:16px;
"
>

<tr>

<td
align="center"
style="
padding:26px;
font-size:15px;
line-height:2;
color:#52525b;
"
>

✨ Inside your Echo

<br><br>

🎵 Listen to your soundtrack

<br>

🖼 Download your album cover

<br>

📤 Share it with friends

</td>

</tr>

</table>

</td>
</tr>

<tr>

<td
align="center"
style="
padding:36px;
background:#fafafa;
border-top:1px solid #e5e7eb;
">

<p style="
margin:0;
font-size:16px;
color:#6b7280;
line-height:1.8;
">

Every Echo is uniquely yours.

</p>

<p style="
margin-top:20px;
font-size:22px;
font-weight:800;
color:#111827;
">

Echo<span style="
background:#111827;
color:white;
padding:2px 10px;
border-radius:8px;
margin-left:4px;
">

Self

</span>

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
