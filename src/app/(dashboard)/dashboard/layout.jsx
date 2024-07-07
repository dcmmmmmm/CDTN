"use client"

import { useState, useEffect } from "react";

import Header from "../../../components/dashboard/Header/Header";
import Sidebar from "../../../components/dashboard/Sidebar/Sidebar";
import Loader from "../../../components/Loader";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function RootLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const {data: session, status } = useSession() 

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [setLoading]);

  if(session?.user?.role !== "ADMIN") {
    return (
      <div className='bg-[#272829] h-screen'>
      <section className="flex flex-col flex-wrap pt-12">
        <div className="flex flex-row flex-wrap justify-center">
          <div className="flex justify-center text-center m-2 h-24 w-64">
            <div className="flex-shrink-0 rounded-full bg-gray-100 w-24 h-24 border border-red-500 z-10">
              <AlertCircle className="p-2 w-24 h-24 text-red-500"/>
            </div>
            <div className="flex flex-col text-left bg-red-500 text-white text-xs self-center pl-16 pr-4 py-2 -ml-12 rounded-r-full">
              <h3 className="text-lg">Acount Error</h3>
              <p className="w-64 text-xs overflow-y-hidden overflow-x-auto">
                You Dont Have Permission To Access This Page, Please Click This {" "}
                <Link href={"/"} className="hover:text-blue-500 text-black">LINK</Link> Return To Home Page
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
  }

  return (
        <div className="bg-gray-200 dark:bg-black  dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Sidebar Start ===== --> */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 z-10">
                    {children}
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
          )}
        </div>
  );
}
