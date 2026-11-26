"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useTableQueryParams = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // search state
    const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
    // pagination page and limit
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // update params call back hook
    const updateParams = useCallback(
        (updates: Record<string, string | number | undefined | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value === undefined || value === null || value === "") {
                    params.delete(key);
                }
                else {
                    params.set(key, String(value));
                }
            }
            );
            router.push(`${pathname}${params.toString()}`)
        }, [router, pathname, searchParams]);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    }

    const handlePageChange = (newPage: number) => {
        updateParams({ page: newPage })
    }

    const handleLimitChange = (newLimit: number) => {
        updateParams({ limit: newLimit, page: 1 })
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentSearchValue = searchParams.get("search");
            if (searchValue !== currentSearchValue) {
                updateParams({ search: searchValue || undefined, page: 1 });
            }
        }, 500);
    }, [searchValue])

    const clearFilterKeys = (keys: string[]) => {
        const updates: Record<string, undefined> = {};

        keys.forEach((k) => updates[k] = undefined);
        updateParams(updates);
    }

    return {
        page,
        limit,
        searchValue,
        handleSearchChange,
        handlePageChange,
        handleLimitChange,
        clearFilterKeys,
    }
}











