import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Product", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "product Not Found",
        },
        { status: 404 }
      );
    }
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Product", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const {
      id,
      title,
      slug,
      imageUrl,
      description,
      isActive,
      isWholeSale,
      sku,
      barcode,
      productCode,
      unit,
      productPrice,
      salePrice,
      wholeSalePrice,
      wholesaleQty,
      productStock,
      qty,
      tags,
      category,
      supplier,
    } = await request.json();

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        imageUrl,
        description,
        isActive,
        isWholeSale,
        sku,
        barcode,
        productCode,
        unit,
        productPrice,
        salePrice,
        wholeSalePrice,
        wholesaleQty,
        productStock,
        qty,
        tags,
        category,
        supplier,
      },
    });
    console.log(updatedProduct);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Product", error },
      { status: 500 }
    );
  }
}
