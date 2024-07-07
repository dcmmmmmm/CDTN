import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
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
        slug: slug,
      },
    });

    if (existingCommunity) {
      return NextResponse.json(
        {
          data: null,
          message: "Community post already exists",
        },
        { status: 409 }
      );
    }

    const newCommunityPost = await prisma.community.create({
      data: {
        title: title,
        slug: slug,
        imageUrl: imageUrl,
        description: description,
        isActive: isActive,
        content: content,
        categoryId: categoryId,
      },
    });
    console.log(newCommunityPost);
    return NextResponse.json(newCommunityPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Community Post", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const communityPost = await prisma.community.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(communityPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Community Post", error },
      { status: 500 }
    );
  }
}
