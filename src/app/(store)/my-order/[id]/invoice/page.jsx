import SalesInvoice from "../../../../../components/store/MyOrder/SalesInvoice";
import React from "react";
import { getData } from "../../../../../lib/getData";

export default async function page({params : {id}}) {
  const order = await getData(`orders/${id}`)
  console.log(order)
  return (
    <SalesInvoice order={order}/>
  );
}