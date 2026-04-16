import { useEffect, useMemo, useState } from 'react';
import { useCustomFetch } from '../../hooks/useCustomFetch';
import { DEBOUNCE_DELAY } from '../../utils/constants';
import { User } from '../../types';
import styles from './AutoComplete.module.css';

interface UsersResponse {
  users: User[];
}

export default function AutoComplete() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { data, loading, error, execute } = useCustomFetch<UsersResponse>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;
    execute(`https://dummyjson.com/users/search?q=${debouncedQuery}`);
  }, [debouncedQuery, execute]);

  const users = useMemo(() => data?.users ?? [], [data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!users.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % users.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? users.length - 1 : prev - 1));
    }

    if (e.key === 'Enter' && highlightedIndex >= 0) {
      const selected = users[highlightedIndex];
      setQuery(`${selected.firstName} ${selected.lastName}`);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        className="input"
        placeholder="Search users..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!!users.length && (
        <ul className={styles.dropdown}>
          {users.map((user, index) => (
            <li
              key={user.id}
              className={`${styles.item} ${
                highlightedIndex === index ? styles.active : ''
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => setQuery(`${user.firstName} ${user.lastName}`)}
            >
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}