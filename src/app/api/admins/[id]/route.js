import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const admin = await prisma.user.findUnique({
      where: {
        id,
        role: "ADMIN",
      },
    });
    return NextResponse.json(admin);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Admin", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: {
        id,
        role: "ADMIN",
      },
    });

    if (!existingAdmin) {
      return NextResponse.json(
        {
          data: null,
          message: "Admin Not Found",
        },
        { status: 404 }
      );
    }
    const deletedAdmin = await prisma.user.delete({
      where: {
        id,
        role: "ADMIN",
      },
    });

    return NextResponse.json(deletedAdmin);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Admin", error },
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
        role: "ADMIN",
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
        role: "ADMIN",
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
