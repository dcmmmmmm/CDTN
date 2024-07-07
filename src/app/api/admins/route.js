import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const admins = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "ADMIN",
      },
    });
    return NextResponse.json(admins);
  } catch (error) {
    error, { message: "Failed to get User" }, { status: 500 };
  }
}
