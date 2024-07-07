import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      code,
      name,
      email,
      imageUrl,
      phoneNumber,
      address,
      isActive,
      notes,
      terms,
      mainCategories,
    } = await request.json();

    const newSupplier = await prisma.supplier.create({
      data: {
        code,
        name,
        email,
        imageUrl,
        phoneNumber,
        address,
        isActive,
        notes,
        terms,
        mainCategories,
      },
    });
    console.log(newSupplier);
    return NextResponse.json(newSupplier);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Supplier", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const supplier = await prisma.supplier.findMany({
      orderBy: {
        createdAt: "desc",
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
