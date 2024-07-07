import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const community = await prisma.community.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(community);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Community", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCommunity = await prisma.community.findUnique({
      where: {
        id,
      },
    });

    if (!existingCommunity) {
      return NextResponse.json(
        {
          data: null,
          message: "Community Post Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCommunity = await prisma.community.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedCommunity);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Community", error },
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
      content,
      categoryId,
    } = await request.json();
    const existingCommunity = await prisma.community.findUnique({
      where: {
        id,
      },
    });

    if (!existingCommunity) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }

    const updatedCommunity = await prisma.community.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        imageUrl,
        description,
        isActive,
        content,
        categoryId,
      },
    });
    console.log(updatedCommunity);
    return NextResponse.json(updatedCommunity);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Community", error },
      { status: 500 }
    );
  }
}
