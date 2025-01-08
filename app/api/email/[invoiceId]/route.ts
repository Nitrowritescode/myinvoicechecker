import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "SS",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "swarsehgal123@gmail.com" }],
      template_uuid: "cf5995f8-e32f-4412-a951-41f7ad09c243",
      template_variables: {
        first_name: invoiceData.clientName,
        // company_info_name: "myinvoice",
        // company_info_address: "Chad street 124",
        // company_info_city: "Munich",
        // company_info_zip_code: "345345",
        // company_info_country: "Germany",
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}