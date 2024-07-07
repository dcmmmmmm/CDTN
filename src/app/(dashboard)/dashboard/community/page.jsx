import PageHeader from "../../../../components/dashboard/PageHeader";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { getData } from "../../../../lib/getData"
import { columns } from "./columns";
import DataTable from "../../../../components/data-table-components/DataTable"
import {
  FileDown,
  FileUp,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function CommunityPage ()  {
  const commnities = await getData('communities')
  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"TypoType Community "}
        href={"/dashboard/community/new"}
        LinkTitle={"Add Training"}
      />
      
      {/* Table */}
      <div className="pt-8"><DataTable data={commnities} columns={columns}/></div>
    </div>
  );
};


