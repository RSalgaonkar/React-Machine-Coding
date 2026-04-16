import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ColumnConfig, SortOrder } from '../../types';
import { cn } from '../../utils/cn';
import { getNumberParam, getSortOrder } from '../../utils/queryParams';

interface Props<T extends object> {
  rows?: T[];
  columns: ColumnConfig<T>[];
  pageSize?: number;
  defaultSortKey: keyof T;
  title?: string;
}

export default function DataTable<T extends object>({
  rows = [],
  columns,
  pageSize = 5,
  defaultSortKey,
  title,
}: Props<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = getNumberParam(searchParams.get('page'), 1);
  const rawSortKey = searchParams.get('sort');
  const sortKey = rawSortKey ? (rawSortKey as keyof T) : defaultSortKey;
  const sortOrder = getSortOrder(searchParams.get('order'), 'asc');

  const sortedRows = useMemo(() => {
    const copy = Array.isArray(rows) ? [...rows] : [];

    copy.sort((a, b) => {
      const first = a[sortKey];
      const second = b[sortKey];

      if (first === second) return 0;
      if (first == null) return 1;
      if (second == null) return -1;

      if (typeof first === 'number' && typeof second === 'number') {
        return sortOrder === 'asc' ? first - second : second - first;
      }

      const firstValue = String(first).toLowerCase();
      const secondValue = String(second).toLowerCase();

      if (firstValue < secondValue) return sortOrder === 'asc' ? -1 : 1;
      if (firstValue > secondValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return copy;
  }, [rows, sortKey, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedRows = sortedRows.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const updateParams = (next: {
    page?: number;
    sort?: string;
    order?: SortOrder;
  }) => {
    const params = new URLSearchParams(searchParams);

    if (next.page) params.set('page', String(next.page));
    if (next.sort) params.set('sort', next.sort);
    if (next.order) params.set('order', next.order);

    setSearchParams(params);
  };

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      updateParams({
        sort: String(key),
        order: sortOrder === 'asc' ? 'desc' : 'asc',
        page: 1,
      });
      return;
    }

    updateParams({
      sort: String(key),
      order: 'asc',
      page: 1,
    });
  };

  return (
    <div className="space-y-4">
      {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column) => {
                  const isActive = sortKey === column.key;

                  return (
                    <th
                      key={String(column.key)}
                      className={cn(
                        'px-4 py-3 text-left text-sm font-semibold text-slate-700',
                        column.sortable ? 'cursor-pointer select-none' : '',
                        column.className
                      )}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="inline-flex items-center gap-2">
                        <span>{column.header}</span>
                        {column.sortable && (
                          <span className="text-xs text-slate-400">
                            {isActive ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-slate-200">
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn('px-4 py-3 text-sm text-slate-700', column.className)}
                      >
                        {column.render ? column.render(row) : String(row[column.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="border-t border-slate-200">
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No rows available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Page {safePage} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={safePage === 1}
            onClick={() =>
              updateParams({
                page: safePage - 1,
                sort: String(sortKey),
                order: sortOrder,
              })
            }
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={safePage === totalPages}
            onClick={() =>
              updateParams({
                page: safePage + 1,
                sort: String(sortKey),
                order: sortOrder,
              })
            }
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}