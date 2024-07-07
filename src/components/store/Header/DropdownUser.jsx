import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Contact, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
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
  const {data: session} = useSession()
  const image = session?.user?.image
  const name = session?.user?.name

  console.log(image)
  console.log(name)
  const router = useRouter()
  if(!session) {
    <Link href={"/login"}>
      <span>Sign in</span>
      <User/>
    </Link>
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant ="ghost">
          <Image width={200} height={200} className='w-8 h-8 rounded-full' alt='User Profile' src={session?.user.image ? session?.user.image : "/Avatar.png"} /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='rounded-xl bg-white text-black dark:bg-slate-700 dark:text-white mr-8'>
        <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.user.role === "ADMIN" ? (
          <DropdownMenuItem>
            <Button className='flex items-center space-x-2 w-full' onClick={() => router.push('/dashboard')}>
              <LayoutDashboard className="" />
              <span>Dashboard</span>
            </Button>
          </DropdownMenuItem>
        ): ""}
        <DropdownMenuItem>
          <Button className='flex items-center space-x-2 w-full' onClick={() => router.push('/my-order')}>
            <User className="" />
            <span>My Order</span>
          </Button>
        </DropdownMenuItem>
        {
          session?.user?.role === "USER" ? (
          <DropdownMenuItem>
            <Button className='flex items-center space-x-2 w-full' onClick={() => router.push(`/profile/${session?.user?.id}`)}>
              <User className="" />
              <span>Edit Profile</span>
            </Button>
          </DropdownMenuItem>
          ) : ""
        }
        <DropdownMenuItem>
          <Button className='flex items-center space-x-2 w-full' onClick={() => signOut()}>
            <LogOut className="" />
            <span>Logout</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
