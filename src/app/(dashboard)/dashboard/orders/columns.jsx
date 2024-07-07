"use client"

import Image from "next/image"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../../../components/ui/checkbox"
import { Button } from "../../../../components/ui/button"
import ActionColumn from "../../../../components/data-table-components/ActionColumn"
import StatusColumn from "../../../../components/data-table-components/StatusColumn"
export const columns = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({row}) => {
      const  firstName = row.getValue("firstName")
      return(
        <div className="line-clamp-1">
          {firstName}
        </div>
      )
    }
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({row}) => {
      const  lastName = row.getValue("lastName")
      return(
        <div className="line-clamp-1">
          {lastName}
        </div>
      )
    }
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
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => <StatusColumn row={row} accessorKey="orderStatus" />,
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const banner = row.original
  //     return (
  //       <ActionColumn row={row} title="Banneer" endpoint={`banner/${banner.id}`} editEndpoint={`catalogues/banner/update/${banner.id}`}/>
  //     )
  //   }
  // },
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
