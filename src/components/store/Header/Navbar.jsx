"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, X, AlignJustify, ShoppingCart } from "lucide-react";
import DropdownUser from "./DropdownUser";
import clsx from "clsx";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import CartCount from "../CartCount"
import SearchForm from "../SearchForm";
export default function Navbar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      <nav className="bg-[#61677A] flex items-center justify-between flex-wrap p-6">
        <Link href={"/"} className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
          <Image src={"/BlackLogo.png"} width={150} height={150} alt="Logo" />
        </Link>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          >
            <svg
              className={`fill-current h-3 w-3 ${isSideMenuOpen ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-current h-3 w-3 ${isSideMenuOpen ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isSideMenuOpen ? "block" : "hidden"}`}>
          <div className="lg:mx-16 py-2 text-lg lg:flex-grow">
            <SearchForm/> 
          </div>

          <div className="flex items-center  ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CartCount/>
            </DropdownMenuTrigger>
          </DropdownMenu>
          {session ? (
            <DropdownUser/>    
          ): (
            <Link href={"/login"} className="flex items-center justify-center gap-2">
              <span>Sign in</span>
              <User/>
            </Link>
          )}
        </div>  
      </div>
      </nav>
      <hr className="lg:mx-0" />
    </div>
  );
}
