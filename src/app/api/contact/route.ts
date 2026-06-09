import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    // 型チェック
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return Response.json({ error: "不正なリクエストです" }, { status: 400 });
    }

    // 必須チェック
    if (!name?.trim()) {
      return Response.json(
        { error: "名前を入力してください" },
        { status: 400 },
      );
    }

    // 文字数制限
    if (name.length > 100) {
      return Response.json({ error: "名前は100文字以内です" }, { status: 400 });
    }

    // 必須チェック
    if (!email?.trim()) {
      return Response.json(
        { error: "メールアドレスを入力してください" },
        { status: 400 },
      );
    }

    // メール形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "メールアドレス形式が不正です" },
        { status: 400 },
      );
    }

    // 必須チェック
    if (!message?.trim()) {
      return Response.json(
        { error: "お問い合わせ内容を入力してください" },
        { status: 400 },
      );
    }

    // 文字数制限
    if (message.length > 2000) {
      return Response.json(
        { error: "お問い合わせ内容は2000文字以内です" },
        { status: 400 },
      );
    }

    // HTMLエスケープ
    const escapeHtml = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "no0645web@gmail.com",
      subject: "ポートフォリオからお問い合わせ",
      html: `
        <h2>お問い合わせ</h2>

        <p><strong>名前</strong></p>
        <p>${safeName}</p>

        <p><strong>メールアドレス</strong></p>
        <p>${safeEmail}</p>

        <p><strong>内容</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

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
