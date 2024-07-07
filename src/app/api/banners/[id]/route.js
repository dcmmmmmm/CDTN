import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const banner = await prisma.banner.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Banner", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingBanner = await prisma.banner.findUnique({
      where: {
        id,
      },
    });

    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "Banner Not Found",
        },
        { status: 404 }
      );
    }
    const deletedBanner = await prisma.banner.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Banner", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { id, title, link, imageUrl, isActive } = await request.json();

    const existingBanner = await prisma.banner.findUnique({
      where: {
        id,
      },
    });

    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }
    const updateBanner = await prisma.banner.update({
      where: {
        id,
      },
      data: {
        title: title,
        link: link,
        imageUrl: imageUrl,
        isActive: isActive,
      },
    });
    console.log(updateBanner);
    return NextResponse.json(updateBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Banner", error },
      { status: 500 }
    );
  }
}
