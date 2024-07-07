import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Store", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingStore = await prisma.store.findUnique({
      where: {
        id,
      },
    });

    if (!existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Store Not Found",
        },
        { status: 404 }
      );
    }
    const deletedStore = await prisma.store.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Store", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { id, title, slug, address, description, isActive } =
      await request.json();
    const existingStore = await prisma.store.findUnique({
      where: {
        id,
      },
    });

    if (!existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 404 }
      );
    }

    const updatedStore = await prisma.store.update({
      where: {
        id,
      },
      data: {
        title: title,
        slug: slug,
        imageUrl: imageUrl,
        description: description,
        isActive: isActive,
      },
    });
    console.log(updatedStore);
    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Store", error },
      { status: 500 }
    );
  }
}
