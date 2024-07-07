"use client"

import Image from "next/image"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../../../components/ui/checkbox"
import { Button } from "../../../../components/ui/button"
import ActionColumn from "../../../../components/data-table-components/ActionColumn"

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
    accessorKey: "description",
    header: "Description",
    cell: ({row}) => {
      const  description = row.getValue("description")
      return(
        <div className="line-clamp-1">
          {description}
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
      const store = row.original
      return (
        <ActionColumn row={row} title="Store" endpoint={`stores/${store.id}`} editEndpoint={`store/update/${store.id}`}/>
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
