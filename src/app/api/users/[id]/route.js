import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get User", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
        role: "USER",
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id,
        role: "USER",
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete User", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const { id, name, email, address, phoneNumber, image, dateOfBirth } =
      await request.json();

    const existingAdmin = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingAdmin) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }
    const dob = new Date(dateOfBirth);

    const updateAdmin = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        image: image,
        dateOfBirth: dob.toISOString(),
      },
    });
    console.log(updateAdmin);
    return NextResponse.json(updateAdmin);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Admin", error },
      { status: 500 }
    );
  }
}
