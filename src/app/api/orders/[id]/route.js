import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const order = await prisma.orderDetail.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get an Order", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingOrder = await prisma.orderDetail.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: "Order Not Found",
        },
        { status: 404 }
      );
    }
    const deletedOrder = await prisma.orderDetail.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Order", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { orderStatus } = await request.json();
    const existingOrder = await prisma.orderDetail.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }

    const updatedOrder = await prisma.orderDetail.update({
      where: {
        id,
      },
      data: {
        orderStatus,
      },
    });
    console.log(updatedOrder);
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Order", error },
      { status: 500 }
    );
  }
}
