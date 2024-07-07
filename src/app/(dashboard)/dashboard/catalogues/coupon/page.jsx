import PageHeader from "../../../../../components/dashboard/PageHeader";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import DataTable from "../../../../../components/data-table-components/DataTable";
import { getData } from "../../../../../lib/getData";
import { columns } from "./columns"
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
export default async function CouponsPage () {
  const coupons = await getData('coupons')
  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"Coupons"}
        href={"/dashboard/catalogues/coupon/new"}
        LinkTitle={"Add Coupon"}
      />

      <div className="pt-8">
        <DataTable data={coupons} columns={columns}/>
      </div>
    </div>
  );
};


