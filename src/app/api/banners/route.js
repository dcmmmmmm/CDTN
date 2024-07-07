import prisma from "../../../lib/db";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { title, link, imageUrl, isActive } = await request.json();

    const newBanner = await prisma.banner.create({
      data: {
        title: title,
        link: link,
        imageUrl: imageUrl,
        isActive: isActive,
      },
    });
    console.log(newBanner);
    return NextResponse.json(newBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Banner", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const banner = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
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
