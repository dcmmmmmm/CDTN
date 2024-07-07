import PageHeader from "../../../../../components/dashboard/PageHeader";
import DataTable from "../../../../../components/data-table-components/DataTable";
import {columns} from "./columns"
import { getData } from "../../../../../lib/getData"
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import {
  FileDown,
  FileUp,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function BannerPage () {
  const banners = await getData('banners')

  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"Banners"}
        href={"/dashboard/catalogues/banner/new"}
        LinkTitle={"Add Banner"}
      />
      
      {/* Table */}
      <div className="pt-8">
        <DataTable columns={columns} data={banners}/>
      </div>
    </div>
  );
};


