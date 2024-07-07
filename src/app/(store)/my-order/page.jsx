import React from 'react'
import OrderCard from "../../../components/store/MyOrder/OrderCard"
import { getData } from '../../../lib/getData'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
export default async function page() {
  // fetch all order
  const orders = await getData("orders")
  // Get user Id
  const session = await getServerSession(authOptions);
  if(!session){
    return
  }
  const userId = session?.user?.id
  console.log(userId)
  if(orders.length === 0 || !orders){
    return(
      <p>No Order yet</p>
    )
  }
  
  // Filter by userId
  const userOrders = orders.filter((order) => order.userId === userId)
  console.log(userOrders) 

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Order Details</h1>
            <p className="mt-2 text-sm font-normal text-gray-600">Check the status of recent and old orders & discover more products</p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {
              userOrders.map((order, i) => {
                return(
                  <OrderCard key={i} order={order} />
                )
              })
            }
          </ul>
        </div>
      </div>
    </section>
  )
}
