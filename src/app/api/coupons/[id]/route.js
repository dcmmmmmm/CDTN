import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(coupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get coupon", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCoupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: "coupon Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCoupon = await prisma.coupon.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Coupon", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const { id, title, couponCode, expireDate, isActive } =
      await request.json();
    const existingCoupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }
    const updateCoupon = await prisma.coupon.update({
      where: {
        id,
      },
      data: {
        title: title,
        couponCode: couponCode,
        expireDate: expireDate,
        isActive: isActive,
      },
    });
    console.log(updateCoupon);
    return NextResponse.json(updateCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Coupon", error },
      { status: 500 }
    );
  }
}
