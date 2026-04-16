import { useMemo, useState } from 'react';
import { paginate } from '../../utils/pagination';
import styles from './SortableTable.module.css';

interface Row {
  id: number;
  name: string;
  email: string;
  age: number;
}

const mockData: Row[] = [
  { id: 1, name: 'John', email: 'john@test.com', age: 25 },
  { id: 2, name: 'Sara', email: 'sara@test.com', age: 28 },
  { id: 3, name: 'Mike', email: 'mike@test.com', age: 22 },
  { id: 4, name: 'Emma', email: 'emma@test.com', age: 31 },
  { id: 5, name: 'Chris', email: 'chris@test.com', age: 27 },
  { id: 6, name: 'Lily', email: 'lily@test.com', age: 24 },
  { id: 7, name: 'David', email: 'david@test.com', age: 35 },
];

type SortKey = keyof Row;

export default function SortableTable() {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const sortedData = useMemo(() => {
    const cloned = [...mockData];
    cloned.sort((a, b) => {
      const first = a[sortKey];
      const second = b[sortKey];

      if (first < second) return sortOrder === 'asc' ? -1 : 1;
      if (first > second) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return cloned;
  }, [sortKey, sortOrder]);

  const paginatedData = useMemo(
    () => paginate(sortedData, page, pageSize),
    [sortedData, page]
  );

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('age')}>Age</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          className="btnSecondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}