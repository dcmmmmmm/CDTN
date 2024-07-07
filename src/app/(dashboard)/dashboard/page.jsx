import CustomDataTable from '../../../components/dashboard/DataTables/CustomDataTable';
import Heading from '../../../components/dashboard/Heading';
import SmallCardDataStats from '../../../components/dashboard/DataCards/SmallCardDataStats';
import LargeCardDataStats from '../../../components/dashboard/DataCards/LargeCardDataStats';
import TotalChart from '../../../components/dashboard/Charts/TotalChart';
import React from 'react'
import { BookUser, CheckCheck, Container, Eye, Loader2, RefreshCcw, ShoppingCart, Truck, Users2, } from 'lucide-react'
import { getServerSession } from 'next-auth';
import { getData } from '../../../lib/getData';
import BestSellingChart from '../../../components/dashboard/Charts/BestSellingChart';
import {columns}  from './columns'
import DataTable from '../../../components/data-table-components/DataTable';
export default async function DashboardPage ()  {
  const sales = await getData('sales');
  const products = await getData('products')
  const customers = await getData(`customers`)
  const orders = await getData('orders')
  const suppliers = await getData('suppliers')
  const admins = await getData('admins')
  const totalProfit = sales.reduce((acc,i) => acc + i.total,0).toFixed(2) ?? 0
  const users = await getData('users')
  const userHaveOrder = users.filter((user) => user.order.length > 0)
  console.log(userHaveOrder)
  const overViewData = [
    {
      title: "Total Suppliers",
      total: suppliers.length.toString().padStart(2, "0"),
      icon: <BookUser/>
    },
    {
      title: "Total Products",
      total: products.length.toString().padStart(2, "0"),
      icon: <ShoppingCart/>
    },
    {
      title: "Total Customers",
      total: customers.length.toString().padStart(2, "0"),
      icon: <Users2/>
    },
    {
      title: "Total Profit",
      total: `$ ${totalProfit}`,
      icon: <Eye/>
    }
  ]


  const status = {
    pending: "PENDING",
    processing: "PROCESSING",
    shipping: "SHIPPING",
    delivered: "DELIVERED"
  }

  const orderPending = orders.filter((order) => order.orderStatus === status.pending)
  const orderProcessing = orders.filter((order) => order.orderStatus === status.processing)
  const orderShipping = orders.filter((order) => order.orderStatus === status.shipping)
  const orderDelivered = orders.filter((order) => order.orderStatus === status.delivered)

  
  const orderCard = [
    {
      title: "Total Orders",
      total: orders.length.toString().padStart(2, "0"),
      icon: <Truck/>
    },
    {
      title: "Order Pending",
      total: orderPending.length.toString().padStart(2, "0"),
      icon: <RefreshCcw/>
    },
    {
      title: "Order Shipped",
      total: orderShipping.length.toString().padStart(2, "0"),
      icon: <Container/>
    },
    {
      title: "Order Processing",
      total: orderProcessing.length.toString().padStart(2, "0"),
      icon: <Loader2/>
    },
    {
      title: "Order Success",
      total: orderDelivered.length.toString().padStart(2, "0"),
      icon: <CheckCheck/>
    }
  ]

  const today = new Date();
  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const todaySales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.toDateString() === today.toDateString();
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  const thisWeekSales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisWeekStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  const thisMonthSales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisMonthStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);
  console.log(todaySales, thisWeekSales, thisMonthSales);
  const totalSales =
    sales.reduce((acc, item) => acc + item.total, 0).toFixed(2) ?? 0;
  const saleData = [
    {
      title: "Today sales",
      total: todaySales,
    },
    {
      title: "This Week Sales",
      total: thisWeekSales,
    },
    {
      title: "This Month Sales",
      total: thisMonthSales,
    },
    {
      title: "All-Time Sales",
      total: `$ ${totalSales}`,
    },
  ];


  return (
    <div>
      <Heading title="Dashboard Overview"/>
      {/* Dashboard Cards */}
      <div className="py-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {
          overViewData.map((item, i) => {
            return(
              <LargeCardDataStats title={item.title} total={item.total} icon={item.icon} key={i}/>
            )
          })
        }
      </div>
      {/* Orders Cards */}
      <Heading title="Orders Overview"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {
          orderCard.map((item, i) => {
            return(
              <LargeCardDataStats title={item.title} total={item.total} icon={item.icon}key={i}/>
            )
          })
        }
      </div>
      {/* Sales Cards */}
      <Heading title="Sales Overview"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {
          saleData.map((item, i) => {
            return(
              <SmallCardDataStats title={item.title} total={item.total} icon={item.icon}key={i}/>
            )
          })
        }
      </div>
      
      {/* <SmallCards/> */}
      {/* Charts */}
      {/* <Heading title="Analystics Overview"/> */}
      <div className="mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <TotalChart orders={orders} sales={sales}/>
        <BestSellingChart/> */}
        <div className="col-span-12 xl:col-span-8 py-4">
          {/* Table */}
          <Heading title="Customer's Total Order"/>
          <div className='py-8'>
            <DataTable columns={columns} data={userHaveOrder}/>
          </div>
        </div>
      </div>
    </div>
  )
}

