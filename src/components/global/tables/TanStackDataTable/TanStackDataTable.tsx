"use client";

import React from "react";

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";
import { DataTableFeatures, features } from "./data-table-features";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  EllipsisVertical,
  Eye,
  PencilIcon,
  Search,
  TrashIcon,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import LoadingCircleSpinner from "../../LoadingCircleSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";

interface IDataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface IDataTableToolbar {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  onClearFilters?: () => void;
}

interface IDataTablePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limitOptions?: number[];
}

interface IDataTableProps<TData extends RowData> {
  title: string;
  description?: string;
  columns: ColumnDef<DataTableFeatures, TData, any>[];
  data: TData[];
  emptyMessage?: string;
  isLoading?: boolean;
  actions?: IDataTableActions<TData>;
  toolbar: IDataTableToolbar;
  pagination?: IDataTablePagination;
}

const TanStackDataTable = <TData extends RowData>({
  title,
  description,
  columns,
  data,
  isLoading,
  emptyMessage,
  actions,
  toolbar,
  pagination,
}: IDataTableProps<TData>) => {
  const tableColumns: ColumnDef<DataTableFeatures, TData, any>[] = actions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    {actions.onView && (
                      <DropdownMenuItem
                        onClick={() => actions.onView?.(rowData)}
                      >
                        <Eye /> View
                      </DropdownMenuItem>
                    )}
                    {
                      // edit
                      actions.onEdit && (
                        <DropdownMenuItem
                          onClick={() => actions.onEdit?.(rowData)}
                        >
                          <PencilIcon /> Edit
                        </DropdownMenuItem>
                      )
                    }
                  </DropdownMenuGroup>
                  {actions.onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => actions.onDelete?.(rowData)}
                        >
                          <TrashIcon /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]
    : columns;

  const table = useTable({
    features,
    data,
    columns: tableColumns,
  });

  const hasToolbar =
    toolbar?.search ||
    toolbar?.filters ||
    toolbar?.actions ||
    toolbar?.onClearFilters;
  return (
    <div className="relative">
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {toolbar?.actions && <div>{toolbar.actions}</div>}
      </div>
      {/* Toolbar: search + filters (left) | create action (right) */}
      {hasToolbar && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div className="flex flex-1 flex-wrap items-center gap-2 justify-between">
            {/* search field */}
            {toolbar?.search && (
              <>
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={toolbar.search.placeholder || "Search..."}
                    value={toolbar.search.value}
                    onChange={(e) => toolbar.search?.onChange(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              {/* filter component */}
              {toolbar?.filters}

              {/* clear filters button */}
              {toolbar?.onClearFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toolbar.onClearFilters}
                  className="gap-1"
                >
                  <X className="w-4 h-4" /> Clear filters
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="relative overflow-hidden rounded-md border">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center z-10 bg-background/50 backdrop-blur-sm">
            <LoadingCircleSpinner />
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination component */}
      {pagination && (
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          onLimitChange={pagination.onLimitChange}
          limitOptions={pagination.limitOptions}
        />
      )}
    </div>
  );
};

export default TanStackDataTable;
