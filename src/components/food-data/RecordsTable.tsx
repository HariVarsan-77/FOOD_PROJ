"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { EmptyState } from "@/components/ui/StateBlocks";
import { FOOD_CATEGORIES } from "@/data/categories";
import type { FoodRecord } from "@/types/records";
import { formatCurrency, formatDate, formatMinutes, formatNumber, formatRating } from "@/utils/format";

/** Columns the table can be sorted by. */
type SortKey =
  | "id"
  | "foodItem"
  | "category"
  | "orderValue"
  | "deliveryTime"
  | "customerRating"
  | "createdAt";

const PAGE_SIZE = 10;

const COLUMNS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "id", label: "Record ID", numeric: false },
  { key: "foodItem", label: "Food item", numeric: false },
  { key: "category", label: "Category", numeric: false },
  { key: "orderValue", label: "Order value", numeric: true },
  { key: "deliveryTime", label: "Delivery time", numeric: true },
  { key: "customerRating", label: "Rating", numeric: true },
  { key: "createdAt", label: "Added on", numeric: false },
];

const SOURCE_LABELS: Record<string, string> = {
  sample: "Sample",
  user: "Added by you",
  database: "Database",
};

/**
 * The records table: search, filter by category, sort any column, refresh and
 * page through the data. It only ever reads the records it is given.
 */
export function RecordsTable({
  records,
  isRefreshing,
  onRefresh,
}: {
  records: FoodRecord[];
  isRefreshing: boolean;
  onRefresh: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const filteredRecords = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const result = records.filter((record) => {
      const matchesSearch =
        term === "" ||
        record.foodItem.toLowerCase().includes(term) ||
        record.category.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === "" || record.category === categoryFilter;
      const matchesSource = sourceFilter === "" || (record.source ?? "sample") === sourceFilter;
      return matchesSearch && matchesCategory && matchesSource;
    });

    const direction = sortDirection === "asc" ? 1 : -1;
    return [...result].sort((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];
      if (typeof left === "number" && typeof right === "number") {
        return (left - right) * direction;
      }
      return String(left).localeCompare(String(right)) * direction;
    });
  }, [records, searchTerm, categoryFilter, sourceFilter, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleRecords = filteredRecords.slice(pageStart, pageStart + PAGE_SIZE);
  const hasActiveFilters =
    searchTerm.trim() !== "" || categoryFilter !== "" || sourceFilter !== "";

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      const isTextColumn = key === "id" || key === "foodItem" || key === "category";
      setSortDirection(isTextColumn ? "asc" : "desc");
    }
    setPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSourceFilter("");
    setPage(1);
  };

  return (
    <section className="panel">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-extrabold text-brown">Saved records</h2>
          <p className="mt-1 text-sm text-brown-soft">
            {formatNumber(records.length)} record{records.length === 1 ? "" : "s"} in the active
            dataset. Search, filter and sort them below.
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Search, filter and sort controls */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <label className="field-label" htmlFor="record-search">
            Search records
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-brown-soft"
              aria-hidden="true"
            />
            <input
              id="record-search"
              type="search"
              className="input pl-10"
              placeholder="Search by food item or category"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="record-category-filter">
            Filter by category
          </label>
          <select
            id="record-category-filter"
            className="input"
            value={categoryFilter}
            onChange={(event) => {
              setCategoryFilter(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All categories</option>
            {FOOD_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="record-source-filter">
            Filter by source
          </label>
          <select
            id="record-source-filter"
            className="input"
            value={sourceFilter}
            onChange={(event) => {
              setSourceFilter(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All sources</option>
            <option value="sample">Built-in sample data</option>
            <option value="user">Records you added</option>
            <option value="database">Database records</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="text-xs text-brown-soft">
          Showing {formatNumber(visibleRecords.length)} of{" "}
          {formatNumber(filteredRecords.length)} matching record
          {filteredRecords.length === 1 ? "" : "s"}
        </p>
        {hasActiveFilters ? (
          <button type="button" className="btn-ghost px-3 py-1.5 text-xs" onClick={resetFilters}>
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Clear filters
          </button>
        ) : null}
      </div>

      {records.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title="No records yet"
            message="The active dataset is empty. Add a food record above and it will appear in this table."
          />
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title="No records match your filters"
            message="Try a different search term or category, or clear the filters to see every record again."
            action={
              <button type="button" className="btn-primary" onClick={resetFilters}>
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <caption className="sr-only">Food delivery records in the active dataset</caption>
              <thead>
                <tr className="border-b border-peach-deep">
                  {COLUMNS.map((column) => {
                    const isSorted = sortKey === column.key;
                    return (
                      <th
                        key={column.key}
                        scope="col"
                        className={`table-cell font-bold text-brown ${column.numeric ? "text-right" : ""}`}
                        aria-sort={
                          isSorted
                            ? sortDirection === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        <button
                          type="button"
                          onClick={() => toggleSort(column.key)}
                          className={`inline-flex items-center gap-1.5 font-bold transition hover:text-primary ${
                            column.numeric ? "flex-row-reverse" : ""
                          } ${isSorted ? "text-primary" : "text-brown"}`}
                        >
                          {column.label}
                          {isSorted ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                            )
                          ) : null}
                        </button>
                      </th>
                    );
                  })}
                  <th scope="col" className="table-cell font-bold text-brown">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleRecords.map((record) => (
                  <tr key={record.id} className="border-b border-peach-deep/50 hover:bg-cream">
                    <td className="table-cell font-mono text-xs text-brown-soft">{record.id}</td>
                    <th scope="row" className="table-cell font-bold text-brown">
                      {record.foodItem}
                    </th>
                    <td className="table-cell text-brown">{record.category}</td>
                    <td className="table-cell text-right text-brown">
                      {formatCurrency(record.orderValue)}
                    </td>
                    <td className="table-cell text-right text-brown">
                      {formatMinutes(record.deliveryTime)}
                    </td>
                    <td className="table-cell text-right text-brown">
                      {formatRating(record.customerRating)}
                    </td>
                    <td className="table-cell text-brown-soft">{formatDate(record.createdAt)}</td>
                    <td className="table-cell">
                      <span
                        className={`badge ${
                          record.source === "user"
                            ? "bg-peach text-primary"
                            : record.source === "database"
                              ? "bg-success-soft text-success"
                              : "bg-cream text-brown-soft"
                        }`}
                      >
                        {SOURCE_LABELS[record.source ?? "sample"]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold text-brown-soft">
              Page {formatNumber(currentPage)} of {formatNumber(totalPages)}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-secondary px-4 py-2"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </button>
              <button
                type="button"
                className="btn-secondary px-4 py-2"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage >= totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
