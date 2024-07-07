"use client"

import Image from "next/image"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../../../components/ui/checkbox"
import { Button } from "../../../../components/ui/button"
import ActionColumn from "../../../../components/data-table-components/ActionColumn"
export const columns = [
  {
    accessorKey: "productTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // {
  //   accessorKey: "productTitle",
  //   header: "Product Title",
  //   cell: ({row}) => {
  //     const  productTitle = row.getValue("productTitle")
  //     return(
  //       <div className="line-clamp-1">
  //         {productTitle}
  //       </div>
  //     )
  //   }
  // },
  {
    accessorKey: "productImage",
    header: "Image",
    cell: ({row}) => {
      const  productImage = row.getValue("productImage")
      return(
        <Image src={productImage} width={500} height={500} alt="categoryImage" className="shrink-0 md:w-16 md:h-16 rounded-full object-cover"/>
      )
    }
  },
  {
    accessorKey: "productPrice",
    header: "Product Price",
    cell: ({row}) => {
      const  productPrice = row.getValue("productPrice")
      return(
        <div className="line-clamp-1">
          {productPrice}
        </div>
      )
    }
  },
  {
    accessorKey: "productQty",
    header: "Product Quantity",
    cell: ({row}) => {
      const  productQty = row.getValue("productQty")
      return(
        <div className="line-clamp-1">
          {productQty}
        </div>
      )
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({row}) => {
      const  total = row.getValue("total")
      return(
        <div className="line-clamp-1">
          {total}
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
