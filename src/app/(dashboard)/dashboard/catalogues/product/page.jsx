import PageHeader from "../../../../../components/dashboard/PageHeader";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { getData } from "../../../../../lib/getData";
import { columns } from "./columns"
import DataTable from "../../../../../components/data-table-components/DataTable";
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

export default async function ProductPage () {
  const products = await getData('products')
  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"Products"}
        href={"/dashboard/catalogues/product/new"}
        LinkTitle={"Add Product"}
      />
    
      {/* Table */}
      <div className="pt-8">
        <DataTable data={products} columns={columns}/>
      </div>
    </div>
  );
};


