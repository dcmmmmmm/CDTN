import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(sales);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Sale", error },
      { status: 500 }
    );
  }
}
