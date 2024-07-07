"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function StatusColumn({ row, accessorKey }) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const orderId = row.original.id;
  const [orderStatus, setOrderStatus] = useState(savedStatus);
  const [loading, setLoading] = useState(false);
  console.log(orderStatus, row.original, orderId);
  async function handleChange(e) {
    const newStatus = e.target.value
    setOrderStatus(newStatus)
    const data = {
      orderStatus: newStatus
    };
    // Make API request here to update status in the database
    console.log(data);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        setLoading(false);
        toast.success(`Order Status Updated Successfully`);
      } else {
        setLoading(false);
        toast.error("Something Went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <select
          id="orderStatus"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange} // Call handleChange when the select value changes
        >
          <option value="DELIVERED" selected={orderStatus === "DELIVERED"}>
            DELIVERED
          </option>
          <option value="PENDING" selected={orderStatus === "PENDING"}>
            PENDING
          </option>
          <option value="SHIPPING" selected={orderStatus === "SHIPPING"}>
            SHIPPING
          </option>
          <option value="PROCESSING" selected={orderStatus === "PROCESSING"}>
            PROCESSING
          </option>
          <option value="CANCELED" selected={orderStatus === "CANCELED"}>
            CANCELED
          </option>
        </select>
      )}
    </>
  );
}