import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, imageUrl, description, isActive } =
      await request.json();
    const existingCategory = await prisma.category.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category already exists",
        },
        { status: 409 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        title: title,
        slug: slug,
        imageUrl: imageUrl,
        description: description,
        isActive: isActive,
      },
    });
    console.log(newCategory);
    return NextResponse.json(newCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Category", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const category = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
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
