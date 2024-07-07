import PageHeader from "../../../../components/dashboard/PageHeader";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { getData } from "../../../../lib/getData"
import { columns } from "./columns";
import DataTable from "../../../../components/data-table-components/DataTable"
import {
  Download,
  FileDown,
  FileUp,
  Import,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function StorePage () {
  const stores = await getData('stores')
  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"Stores"}
        href={"/dashboard/store/new"}
        LinkTitle={"Add Store"}
      />
     
      {/* Table */}
      <div className="pt-8"><DataTable data={stores} columns={columns}/></div>
    </div>
  );
};


