"use client"

import Image from "next/image"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../../components/ui/checkbox"
import { Button } from "../../../components/ui/button"
import ActionColumn from "../../../components/data-table-components/ActionColumn"
export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({row}) => {
      const  email = row.getValue("email")
      return(
        <div className="line-clamp-1">
          {email}
        </div>
      )
    }
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({row}) => {
      const  phoneNumber = row.getValue("phoneNumber")
      return(
        <div className="line-clamp-1">
          {phoneNumber}
        </div>
      )
    }
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => {
      const  address = row.getValue("address")
      return(
        <div className="line-clamp-1">
          {address}
        </div>
      )
    }
  },
  {
    accessorKey: "order",
    header: "Total Order",
    cell: ({row}) => {
      const  order = row.getValue("order")
      return(
        <div className="line-clamp-1">
          {order.length}
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({row}) => {
      const createdAt = row.getValue("createdAt")
      const originalDate = new Date(createdAt).toDateString();
;     
      return(
        <div className="">
          {originalDate}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <ActionColumn row={row} title="Customers" endpoint={`customers/${customer.id}`} editEndpoint={`/customer/update/${customer.id}`}/>
      )
    }
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
]
