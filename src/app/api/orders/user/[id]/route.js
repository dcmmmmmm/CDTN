import prisma from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const orders = await prisma.orderDetail.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get an Order", error },
      { status: 500 }
    );
  }
}
