"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import { Share2 } from 'lucide-react'
import {Button} from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { ShareSocial } from 'react-share-social'
export default function ProductShareBtn({urlToShare}) {
  const [openShare, setOpenShare] = useState(false)
  return (
    <div>
      <Dialog>
        <DialogTrigger>
        <Button
            onClick={() => setOpenShare(true)}
            className ='flex items-center justify-between gap-3'
          >
            <Share2/>
            Share
          </Button>
        </DialogTrigger>
        <DialogContent>
            Share This Product To Others
          <ShareSocial url ={urlToShare}
            socialTypes={['facebook','twitter','reddit','linkedin']}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
