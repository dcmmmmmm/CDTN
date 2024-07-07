import prisma from "../../../../lib/db";
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

export async function DELETE(request, { params: { id } }) {
  try {
    const existingSupplier = await prisma.Supplier.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        {
          data: null,
          message: "Supplier Not Found",
        },
        { status: 404 }
      );
    }
    const deletedSupplier = await prisma.supplier.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedSupplier);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Supplier", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const {
      id,
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

    const existingSupplier = await prisma.supplier.findUnique({
      where: {
        id,
      },
    });
    if (!existingSupplier) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }
    const updateSupplier = await prisma.supplier.update({
      where: {
        id,
      },
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
    console.log(updateSupplier);
    return NextResponse.json(updateSupplier);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Supplier", error },
      { status: 500 }
    );
  }
}
