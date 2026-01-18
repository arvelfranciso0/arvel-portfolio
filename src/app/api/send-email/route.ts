import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, message } = await request.json();
  const serviceId = process.env.EMAIL_JS_SERVICE_ID;
  const templateId = process.env.EMAIL_JS_TEMPLATE_NAME;
  const userId = process.env.EMAIL_JS_PUBLIC_KEY;
  const accessToken = process.env.EMAIL_JS_PRIVATE_KEY;

  if (!email || !name || !message) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const requestBodyEmailJs = {
    template_params: {
      email,
      name,
      message,
    },
    service_id: serviceId,
    template_id: templateId,
    user_id: userId,
    accessToken,
  };

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBodyEmailJs),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: "Email send failed", error: errorText },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
