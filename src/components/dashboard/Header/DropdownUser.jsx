import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Contact, LogOut, Settings, User } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const DropdownUser = () => {
  const router = useRouter()
  const {data: session} = useSession()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant ="ghost">
          <span className="hidden text-right lg:mr-2 lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {session?.user.name}
            </span>
          </span>
            <Image width={200} height={200} className='w-8 h-8 rounded-full' alt='User Profile' src={session?.user.image ? session?.user.image : "/Avatar.png" }/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='rounded-xl bg-white text-black dark:bg-slate-700 dark:text-white mr-8'>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className='flex items-center space-x-2 w-full' >
            <Contact className="" />
              <span>My Contacts</span>
            </Button>
          </DropdownMenuItem>
        <DropdownMenuItem>
          <Button className='flex items-center   space-x-2 w-full' onClick={() => router.push(`/dashboard/profile/${session?.user?.id}`)}>
            <User className="" />
            <span>Profile Detail</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button className='flex items-center space-x-2 w-full' onClick={() => signOut({callbackUrl: '/login', redirect:true})}>
            <LogOut className="" />
            <span>Logout</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
