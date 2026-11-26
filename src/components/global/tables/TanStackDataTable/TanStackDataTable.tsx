"use client";

import React from "react";

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";
import { DataTableFeatures, features } from "./data-table-features";

interface IDataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface IDataTableProps<TData extends RowData> {
  title: string;
  description?: string;
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  actions: IDataTableActions<TData>;
}

const TanStackDataTable = <TData extends RowData>({
  columns,
  data,
}: IDataTableProps<TData>) => {
  const table = useTable({
    features,
    data,
    columns,
  });
  return <div>TanStackDataTable</div>;
};

export default TanStackDataTable;
