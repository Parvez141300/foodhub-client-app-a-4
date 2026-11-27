import { DataTableFeatures } from "@/components/global/tables/TanStackDataTable/data-table-features";
import { IWishlist } from "@/types/wishlist.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<DataTableFeatures, IWishlist>();

export const wishlistTableColumn = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),
  
];
