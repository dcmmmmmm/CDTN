import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Users", error },
      { status: 500 }
    );
  }
}
