"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeDollarSign,
  Boxes,
  ChevronDown,
  ChevronRight,
  Coins,
  Contact2,
  ExternalLink,
  LayoutGrid,
  LayoutList,
  LogOut,
  Replace,
  SendToBack,
  Settings,
  Slack,
  Store,
  Truck,
  User,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useTheme } from "next-themes";


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const sidebarLinks = [
    {
      title: "Customer",
      icon: Users2,
      href: "/dashboard/customer",
      includes: "customer",
    },
    {
      title: "Admin",
      icon: Users2,
      href: "/dashboard/admin",
      includes: "admin",
    },
    {
      title: "Community",
      icon: Store,
      href: "/dashboard/community",
      includes: "store",
    },
    {
      title: "Store",
      icon: Store,
      href: "/dashboard/store",
      includes: "store",
    },
    {
      title: "Supplier",
      icon: Contact2,
      href: "/dashboard/supplier",
      includes: "supllier",
    },
    {
      title: "Order",
      icon: Truck,
      href: "/dashboard/orders",
      includes: "order",
    },
    {
      title: "Sale",
      icon: BadgeDollarSign,
      href: "/dashboard/sale",
      includes: "sale",
    },
        {
      title: "Online Store",
      icon: ExternalLink,
      href: "/",
      includes: "/",
    },
  ];
  const catalougeLinks = [
    {
      title: "Product",
      icon: Boxes,
      href: "/dashboard/catalogues/product",
      includes: "product",
    },
    {
      title: "Category",
      icon: LayoutList,
      href: "/dashboard/catalogues/category",
      includes: "category",
    },
    // {
    //   title: "Coupon",
    //   icon: Coins,
    //   href: "/dashboard/catalogues/coupon",
    //   includes: "coupon",
    // },
    {
      title: "Banner",
      icon: Replace,
      href: "/dashboard/catalogues/banner",
      includes: "banner",
    },
  ];
  const pathname = usePathname();

  const trigger = useRef();
  const sidebar = useRef();

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const { theme } = useTheme();

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-20 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white text-black duration-300 ease-linear dark:bg-slate-900 dark:text-white lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={theme === "light" ? "/BlackLogo.png" : "/WhiteLogo.png"}
            alt="Logo"
          />
        </Link>

        <Button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        ></Button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link
                  href="/dashboard"
                  className={
                    pathname === "/dashboard"
                      ? "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out bg-black text-white hover:bg-black hover:text-white dark:hover:bg-meta-4"
                      : "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black hover:text-white dark:hover:bg-meta-4"
                  }
                >
                  <LayoutGrid width={18} height={18} />
                  <span>Dashboard</span>
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
              {/* <!-- Menu Item Catalouge --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/catalogues" ||
                  pathname.includes("catalogues")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/dashboard/catalogues" ||
                            pathname.includes("catalogues")) &&
                          "bg-black text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <Slack width={18} height={18} />
                        <span>Catalouge</span>
                        <ChevronRight
                          width={20}
                          height={20}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {catalougeLinks.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <li key={index}>
                                <Link
                                  href={item.href}
                                  className={
                                    pathname === item.href ||
                                    (pathname.includes(item.includes) &&
                                      "bg-black text-white")
                                      ? "group relative flex items-center gap-2.5 rounded-sm px-4 font-medium text-bodydark1 duration-300 ease-in-out bg-black text-white hover:bg-black hover:text-white dark:hover:bg-meta-4"
                                      : "group relative flex items-center gap-2.5 rounded-sm px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black hover:text-white dark:hover:bg-meta-4"
                                  }
                                >
                                  <Icon width={18} height={18} />
                                  <span>{item.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Catalouge --> */}
              {/* <!-- Menu Item List --> */}
              {sidebarLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={
                        pathname === item.href
                          ? "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out bg-black text-white hover:bg-black hover:text-white dark:hover:bg-meta-4"
                          : "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black hover:text-white dark:hover:bg-meta-4"
                      }
                    >
                      <Icon width={18} height={18} />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              {/* <!-- Menu Item List --> */}
            </ul>
            <div className="flex items-center justify-center group relative  gap-2.5 rounded-xl py-2 px-5 font-medium text-bodydark1 bg-black text-white duration-300 ease-in-out ">
              <Button variant= "ghost ">
                <LogOut width={18} height={18} />
                <span className="px-3 ">Logout</span>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
