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
    subject: `🎵 Your ${genre.charAt(0).toUpperCase() + genre.slice(1)} Echo is Ready!`,
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0;padding:40px 20px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tr>
<td align="center">

<table role="presentation"
width="600"
cellspacing="0"
cellpadding="0"
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
padding:56px 40px;
background:linear-gradient(135deg,#111827,#1f2937);
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
border-radius:12px;
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

Your personalized album just dropped 🎵

</p>

</td>
</tr>

<tr>
<td style="padding:40px;">

<img
src="${imageUrl}"
alt="EchoSelf Album"
style="
display:block;
width:100%;
border-radius:18px;
box-shadow:0 10px 30px rgba(0,0,0,.18);
"
/>

<h2 style="
margin:36px 0 12px;
font-size:30px;
color:#111827;
">

Your Album is Ready

</h2>

<p style="
margin:0;
font-size:17px;
line-height:1.8;
color:#52525b;
">

Your AI-generated album artwork and soundtrack are now ready.

Listen, download and share your Echo with friends.

</p>

<table
role="presentation"
width="100%"
cellspacing="0"
cellpadding="0"
style="
margin:36px 0;
background:#18181b;
border-radius:18px;
padding:24px;
color:white;
">

<tr>

<td>

<div style="
font-size:13px;
letter-spacing:2px;
color:#a1a1aa;
text-transform:uppercase;
margin-bottom:18px;
">

EchoSelf Original

</div>

<table width="100%">

<tr>

<td style="color:#9ca3af;padding:8px 0;">
Genre
</td>

<td
align="right"
style="
font-weight:700;
text-transform:uppercase;
"
>

${genre}

</td>

</tr>

<tr>

<td style="color:#9ca3af;padding:8px 0;">
Artist
</td>

<td
align="right"
style="
font-weight:700;
"
>

YOU

</td>

</tr>

<tr>

<td style="color:#9ca3af;padding:8px 0;">
Released
</td>

<td
align="right"
style="
font-weight:700;
"
>

${new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})}

</td>

</tr>

</table>

</td>

</tr>

</table>

<table role="presentation" width="100%">
<tr>
<td align="center">

<a
href="${shareUrl}"
style="
display:inline-block;
padding:16px 34px;
background:#111827;
color:white;
text-decoration:none;
font-size:17px;
font-weight:700;
border-radius:12px;
">

🎧 Listen & Download

</a>

</td>
</tr>
</table>

<table
role="presentation"
width="100%"
cellspacing="0"
cellpadding="0"
style="
margin-top:36px;
background:#f9fafb;
border-radius:16px;
"
>

<tr>

<td
align="center"
style="
padding:24px;
font-size:15px;
line-height:2;
color:#52525b;
"
>

📱 Open your Echo to

<br>

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
"
>

<p style="
margin:0;
font-size:15px;
color:#6b7280;
line-height:1.8;
">

Music has always been personal.

<br>

Now your artwork is too.

</p>

<p style="
margin-top:18px;
font-size:18px;
font-weight:700;
color:#111827;
">

EchoSelf

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
