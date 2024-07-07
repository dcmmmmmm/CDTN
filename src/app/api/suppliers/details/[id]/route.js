import prisma from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Supplier", error },
      { status: 500 }
    );
  }
}
