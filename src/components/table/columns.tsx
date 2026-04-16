import type { ColumnConfig, TableRow } from '../../types';

export const employeeColumns: ColumnConfig<TableRow>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (row) => <span className="font-medium text-slate-900">{row.name}</span>,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'age',
    header: 'Age',
    sortable: true,
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
  },
];