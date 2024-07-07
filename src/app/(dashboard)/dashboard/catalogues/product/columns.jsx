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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({row}) => {
      const imageUrl = row.getValue("imageUrl")
      return(
        <Image src={imageUrl ? imageUrl : "/AppleLogo.png"} width={500} height={500} alt="categoryImage" className="shrink-0 md:w-16 md:h-16  rounded-full object-cover"/>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Descriptions",
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
    accessorKey: "salePrice",
    header: "Sale Price",
    cell: ({row}) => {
      const  salePrice = row.getValue("salePrice")
      return(
        <div className="line-clamp-1">
          {salePrice}
        </div>
      )
    }
  },
  {
    accessorKey: "productStock",
    header: "Stock",
    cell: ({row}) => {
      const  productStock = row.getValue("productStock")
      return(
        <div className="line-clamp-1">
          {productStock}
        </div>
      )
    }
  },
  {
    accessorKey: "productStock",
    header: "Stock",
    cell: ({row}) => {
      const  productStock = row.getValue("productStock")
      return(
        <div className="line-clamp-1">
          {productStock}
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
      const product = row.original
      return (
        <ActionColumn row={row} title="Product" endpoint={`products/${product.id}`} editEndpoint={`catalogues/product/update/${product.id}`}/>
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
