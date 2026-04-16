import DataTable from '../components/table/DataTable';
import { employeeColumns } from '../components/table/columns';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import { tableData } from '../data/tableData';

export default function TablePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sortable Table"
        description="Reusable config-driven table with sort and pagination state synchronized to URL query params."
      />
      <Card>
        <DataTable
          rows={tableData}
          columns={employeeColumns}
          pageSize={4}
          defaultSortKey="name"
          title="Employees"
        />
      </Card>
    </div>
  );
}