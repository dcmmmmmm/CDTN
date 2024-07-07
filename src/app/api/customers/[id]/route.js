import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const customer = await prisma.user.findUnique({
      where: {
        id,
        role: "USER",
      },
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get customer", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCustomer = await prisma.user.findUnique({
      where: {
        id,
        role: "USER",
      },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        {
          data: null,
          message: "Customer Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCustomer = await prisma.user.delete({
      where: {
        id,
        role: "USER",
      },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Customer", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { id, name, email, address, phoneNumber, image, dateOfBirth } =
      await request.json();

    const existingCustomer = await prisma.user.findUnique({
      where: {
        id,
        role: "USER",
      },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }
    const dob = new Date(dateOfBirth);

    const updateCustomer = await prisma.user.update({
      where: {
        id,
        role: "USER",
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
    console.log(updateCustomer);
    return NextResponse.json(updateCustomer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Customer", error },
      { status: 500 }
    );
  }
}
