import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      title,
      slug,
      description,
      isActive,
      isWholeSale,
      sku,
      barcode,
      productCode,
      unit,
      productPrice,
      salePrice,
      wholeSalePrice,
      wholesaleQty,
      productStock,
      qty,
      tags,
      categoryId,
      supplierId,
      imageUrl,
    } = await request.json();

    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
    });
    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product already exists",
        },
        { status: 409 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        title: title,
        slug: slug,
        description: description,
        isActive: isActive,
        isWholeSale: isWholeSale,
        sku: sku,
        barcode: barcode,
        productCode: productCode,
        unit: unit,
        productPrice: parseFloat(productPrice),
        salePrice: parseFloat(salePrice),
        wholeSalePrice: parseFloat(wholeSalePrice),
        wholesaleQty: parseInt(wholesaleQty),
        productStock: parseInt(productStock),
        qty: parseInt(qty),
        tags: tags,
        categoryIds: categoryId,
        supplierIds: supplierId,
        imageUrl: imageUrl,
      },
    });
    console.log(newProduct);
    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Product", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const categoryIds = request.nextUrl.searchParams.get("cateId");
  const sortBy = request.nextUrl.searchParams.get("sort");
  const min = request.nextUrl.searchParams.get("min");
  const max = request.nextUrl.searchParams.get("max");
  const searchTerm = request.nextUrl.searchParams.get("search");
  const page = request.nextUrl.searchParams.get("page") || 1;
  const pageSize = 3;
  let where = {
    categoryIds,
  };
  if (min && max) {
    where.salePrice = {
      gte: parseFloat(min),
      lte: parseFloat(max),
    };
  } else if (min) {
    where.salePrice = {
      gte: parseFloat(min),
    };
  } else if (max) {
    where.salePrice = {
      lte: parseFloat(max),
    };
  }
  let products;
  try {
    if (searchTerm) {
      products = await prisma.product.findMany({
        where: {
          OR: [{ title: { contains: searchTerm, mode: "insensitive" } }],
        },
      });
    }
    // else
    // if (categoryIds && page) {
    //   products = await prisma.product.findMany({
    //     where,
    //     skip: (parseInt(page) - 1) * parseInt(pageSize),
    //     take: parseInt(pageSize),
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   });
    // }
    else if (categoryIds && sortBy) {
      products = await prisma.product.findMany({
        where,
        orderBy: {
          salePrice: sortBy === "asc" ? "asc" : "desc",
        },
      });
    } else if (categoryIds) {
      products = await prisma.product.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      products = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to get Product",
        error,
      },
      { status: 500 }
    );
  }
}
