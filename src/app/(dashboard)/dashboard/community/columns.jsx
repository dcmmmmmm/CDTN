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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({row}) => {
      const imageUrl = row.getValue("imageUrl")
      return(
        <Image src={imageUrl} width={500} height={500} alt="categoryImage" className="shrink-0 md:w-16 md:h-16 rounded-full object-cover"/>
      )
    }
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({row}) => {
      const  content = row.getValue("content")
      return(
        <div className="line-clamp-1">
          {content}
        </div>
      )
    }
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
      const community = row.original
      return (
        <ActionColumn row={row} title="Community" endpoint={`communities/${community.id}`} editEndpoint={`community/update/${community.id}`}/>
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
