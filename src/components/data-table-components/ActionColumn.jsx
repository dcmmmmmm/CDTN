'use client'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "../ui/dropdown-menu"
import DeleteButton from "../action/DeleteButton"
import EditButton from '../action/EditButton'
export default function ActionColumn({row, title, endpoint, editEndpoint}) {
  const isActive = row.isActive
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <DeleteButton id={row.id} title={title} endpoint={endpoint}/>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <EditButton title={title} editEndpoint={editEndpoint}/>
      </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
