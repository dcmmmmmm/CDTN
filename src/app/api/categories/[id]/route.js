import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
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

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Category", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { id, title, slug, imageUrl, description, isActive } =
      await request.json();
    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        title: title,
        slug: slug,
        imageUrl: imageUrl,
        description: description,
        isActive: isActive,
      },
    });
    console.log(updatedCategory);
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Category", error },
      { status: 500 }
    );
  }
}
