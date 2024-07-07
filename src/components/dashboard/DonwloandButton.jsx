"use client"
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import { FileUp } from 'lucide-react'
import { useReactToPrint } from "react-to-print"

export default function DonwloandButton() {
  const invoiceRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  return (
    <div>
      <Button 
          onClick={handlePrint}
          type="button" 
          className="bg-green-700 rounded-xl text-white hover:bg-green-600 ">
        <FileUp className="mr-2" />
        <span className="">Export</span>
      </Button>
    </div>
  )
}
