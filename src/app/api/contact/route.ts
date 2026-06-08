import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "no0645web@gmail.com",
      subject: "ポートフォリオからお問い合わせ",
      html: `
        <h2>お問い合わせ</h2>

        <p><strong>名前</strong></p>
        <p>${name}</p>

        <p><strong>メールアドレス</strong></p>
        <p>${email}</p>

        <p><strong>内容</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
