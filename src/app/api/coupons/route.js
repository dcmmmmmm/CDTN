import prisma from "../../../lib/db";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { title, couponCode, expireDate, isActive } = await request.json();

    const newCoupon = await prisma.coupon.create({
      data: {
        title: title,
        couponCode: couponCode,
        expireDate: expireDate,
        isActive: isActive,
      },
    });
    console.log(newCoupon);
    return NextResponse.json(newCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Coupon", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const coupon = await prisma.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(coupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Coupon", error },
      { status: 500 }
    );
  }
}
