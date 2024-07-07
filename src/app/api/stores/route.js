import prisma from "../../../lib/db";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { title, slug, address, description, isActive } =
      await request.json();

    const existingStore = await prisma.store.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Store already exists",
        },
        { status: 409 }
      );
    }

    const newStore = await prisma.store.create({
      data: {
        title: title,
        slug: slug,
        address: address,
        description: description,
        isActive: isActive,
      },
    });

    console.log(newStore);
    return NextResponse.json(newStore);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Store", error },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const store = await prisma.store.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Coupon", error },
      { status: 500 }
    );
  }
}
