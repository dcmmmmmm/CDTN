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

export default async function SupplierPage () {
  const suppliers = await getData('suppliers')
  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"Suppliers"}
        href={"/dashboard/supplier/new"}
        LinkTitle={"Add Supplier"}
      />
      
      {/* Table */}
      <div className="pt-8"><DataTable data={suppliers} columns={columns} filterKeys={["name"]}/></div>
    </div>
  );
};


