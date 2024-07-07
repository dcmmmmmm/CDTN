"use client"
import Image from "next/image";
import React, { useRef } from "react";
import { ConvertIsoDateToNormal } from "../../../lib/ConvertIsoDateToNormal"
import { Button } from "../../ui/button";
import { useReactToPrint } from "react-to-print"
export default function SalesInvoice({order}) {
  const orderDate = ConvertIsoDateToNormal(order.createdAt)
  const subTotal = order.orderItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const tax = 20;
  const total = (parseFloat(subTotal) + parseFloat(tax) + 10 ).toFixed(2)
  const invoiceRef = useRef();

  // sử dụng thư viện react-to-print để in hóa đơn
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  return (
    <div className="flex flex-col">
      {/* Download button */}
      <div className="flex items-end justify-end">
        <Button
          onClick={handlePrint}
          type="button"
          className="inline-flex items-center justify-center px-4 py-3  text-xs font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200"
        >
          Download/Print Invoice
        </Button>
      </div>
      {/* Invoice */}
      <div ref={invoiceRef}>
        <div className="bg-white border rounded-lg shadow-xl px-6 py-8 max-w-md mx-auto mt-8">
          <Image src={"/BlackLogo.png"} width={200} height={200} alt="logo" className=" my-4 mx-5"/>
          {/* <h1 className="font-bold text-2xl my-4 text-center text-blue-600">KRP Services</h1> */}
          <hr className="mb-2"/>
          <div className="flex justify-between mb-6">
            <h1 className="text-lg font-bold">Invoice</h1>
            <div className="text-gray-700">
                <div>Date: {orderDate}</div>
                <div>Invoice #: {order.orderNumber}</div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
            <div className="text-gray-700 mb-2">{order.firstName} {order.lastName}</div>
            <div className="text-gray-700 mb-2">{order.streetAddress},{order.district},{order.city}</div>
            <div className="text-gray-700 mb-2">{order.country}</div>
            <div className="text-gray-700">{order.email}</div>
          </div>
          <table className="w-full mb-8">
            <thead className="border-b-2" >
              <tr>
                <th className="text-left font-bold text-gray-700 ">Description</th>
                <th className="text-center text-gray-700">Qty</th>
                <th className="text-right text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                order.orderItems.map((item,i) => {
                  const itemSubTotal = (item.quantity * item.price).toFixed(2)
                  return(
                  <tr key={i}>
                    <td className="text-left text-gray-700">{item.title}</td>
                    <td className="text-center text-gray-700">{item.quantity}</td>
                    <td className="text-right text-gray-700">${itemSubTotal}</td>
                  </tr>
                  )
                })
              }
            </tbody >
            <tfoot className="border-t-2">
              <tr>
                <td className="text-left font-bold text-gray-700">Sub Total</td>
                <td className="text-center font-bold text-gray-700">{" "}</td>
                <td className="text-right font-bold text-gray-700">${subTotal}</td>
              </tr>
              <tr>
                <td className="text-left font-bold text-gray-700">Tax</td>
                <td className="text-center font-bold text-gray-700">{" "}</td>
                <td className="text-right font-bold text-gray-700">${tax}</td>
              </tr>
              <tr>
                <td className="text-left font-bold text-gray-700">Shipping</td>
                <td className="text-center font-bold text-gray-700">{" "}</td>
                <td className="text-right font-bold text-gray-700">$ 10 </td>
              </tr>
              <tr>
                <td className="text-left font-bold text-gray-700">Total</td>
                <td className="text-center font-bold text-gray-700">{" "}</td>
                <td className="text-right font-bold text-gray-700">${total}</td>
              </tr>
            </tfoot>
          </table>
          <div className="text-gray-700 mb-2">Thank you for your business!</div>
          <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
        </div>
      </div>
    </div>
  );
}