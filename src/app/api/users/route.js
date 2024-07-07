import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../lib/db";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/EmailTemplate";
export async function POST(request) {
  try {
    const {
      name,
      email,
      password,
      role,
      verificationToken,
      code,
      address,
      phoneNumber,
      image,
      dateOfBirth,
    } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User already exist",
        },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        // verificationToken: token,
        code: code,
        address: address,
        phoneNumber: phoneNumber,
        image: image,
        dateOfBirth: dateOfBirth,
      },
    });
    console.log(newUser);
    return NextResponse.json(
      {
        data: newUser,
        message: "User Created Succesfuly",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        order: true,
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
