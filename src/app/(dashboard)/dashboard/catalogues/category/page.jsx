import PageHeader from "../../../../../components/dashboard/PageHeader";
import DataTable from "../../../../../components/data-table-components/DataTable";
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
import { getData } from "../../../../../lib/getData";
import { columns } from "./columns"
export default async function CategoryPage () {
  const categories = await getData('categories')
  
  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"Categories"}
        href={"/dashboard/catalogues/category/new"}
        LinkTitle={"Add Category"}
      />
      
      {/* Table */}
      <div className="pt-8">
        <DataTable data={categories} columns={columns}/>
      </div>
    </div>
  );
};
