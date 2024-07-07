"use client"
import Navbar from "../../components/store/Header/Navbar";
import Footer from "../../components/store/Footer";
import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
export default function StoreLayout({
  children,
}) {
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [setLoading]);
  return (
      <div className="bg-[#272829]">
        {loading ? (
            <Loader />
          ) : (
            <>
              <Navbar />
              <div className="h-full max-w-6xl mx-auto py-6 px-4 lg:px-0">
                {children}
              </div>
              <Footer />
            </>
        )}    
      </div>
  );
}
