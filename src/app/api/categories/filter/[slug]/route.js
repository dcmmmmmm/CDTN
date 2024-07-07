import prisma from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Category", error },
      { status: 500 }
    );
  }
}
