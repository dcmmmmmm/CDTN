"use client"

import Image from "next/image"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../../../../components/ui/checkbox"
import { Button } from "../../../../../components/ui/button"
import ActionColumn from "../../../../../components/data-table-components/ActionColumn"

export const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "expireDate",
    header: "Expire Date",
    cell: ({row}) => {
      const expireDate = row.getValue("expireDate")
      const originalDate = new Date(expireDate).toDateString();    
      return(
        <div className="">
          {originalDate}
        </div>
      )
    }
  },
  {
    accessorKey: "isActive",
    header: "IsActive",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({row}) => {
      const createdAt = row.getValue("createdAt")
      const originalDate = new Date(createdAt).toDateString();    
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
      const coupon = row.original
      return (
        <ActionColumn row={row} title="Coupon" endpoint={`coupons/${coupon.id}`} editEndpoint={`catalogues/coupon/update/${coupon.id}`}/>
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
