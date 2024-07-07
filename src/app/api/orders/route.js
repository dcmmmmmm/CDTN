import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { checkoutFormData, orderItems } = await request.json();
    const {
      city,
      country,
      district,
      email,
      firstName,
      lastName,
      paymentMethod,
      phoneNumber,
      shippingCost,
      orderNumber,
      streetAddress,
      orderStatus,
      userId,
    } = checkoutFormData;
    // Order Number
    function generateOrderNumber(length) {
      const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let orderNumber = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderNumber += characters.charAt(randomIndex);
      }

      return orderNumber;
    }

    // Use the Prisma transaction
    const result = await prisma.$transaction(async (db) => {
      // Create order and order items within the transaction
      const newOrder = await db.orderDetail.create({
        data: {
          city,
          country,
          district,
          email,
          firstName,
          lastName,
          paymentMethod,
          phoneNumber,
          orderStatus,
          shippingCost: parseFloat(shippingCost),
          orderNumber: generateOrderNumber(8),
          streetAddress,
          userId,
        },
      });

      const newOrderItems = await db.orderItem.createMany({
        data: orderItems.map((item) => ({
          productId: item.id,
          quantity: parseInt(item.qty),
          price: parseFloat(item.salePrice),
          orderId: newOrder.id,
          imageUrl: item.imageUrl,
          title: item.title,
          supplierIds: item.id,
        })),
      });

      // Calculate total amount for each product and create a sale for each
      const sales = await Promise.all(
        orderItems.map(async (item) => {
          const totalAmount = parseFloat(item.salePrice) * parseInt(item.qty);

          const newSale = await db.sale.create({
            data: {
              orderId: newOrder.id,
              productTitle: item.title,
              productPrice: parseFloat(item.salePrice),
              productImage: item.imageUrl,
              productQty: parseInt(item.qty),
              productId: item.id,
              supplierIds: item.supplierIds,
              total: totalAmount,
            },
          });

          return newSale;
        })
      );

      return { newOrder, newOrderItems, sales };
    });

    console.log(result.newOrder, result.newOrderItems, result.sales);

    return NextResponse.json(result.newOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Order", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const orders = await prisma.orderDetail.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get Orders", error },
      { status: 500 }
    );
  }
}
