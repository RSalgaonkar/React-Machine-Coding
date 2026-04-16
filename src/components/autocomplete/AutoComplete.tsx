import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { User } from '../../types';
import { useCustomFetch } from '../../hooks/useCustomFetch';
import { useDebounce } from '../../hooks/useDebounce';
import { cn } from '../../utils/cn';

interface UsersResponse {
  users: User[];
}

export default function AutoComplete() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { data, loading, error, execute } = useCustomFetch<UsersResponse>();
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setIsOpen(false);
      return;
    }

    execute(`https://dummyjson.com/users/search?q=${encodeURIComponent(debouncedQuery)}`);
  }, [debouncedQuery, execute]);

  const users = useMemo(() => data?.users ?? [], [data]);

  useEffect(() => {
    setIsOpen(users.length > 0 && query.trim().length > 0);
  }, [users, query]);

  const selectUser = (user: User) => {
    setQuery(`${user.firstName} ${user.lastName}`);
    setHighlightedIndex(-1);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!users.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) => (prev + 1) % users.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev <= 0 ? users.length - 1 : prev - 1));
        break;
      case 'Enter':
        if (highlightedIndex >= 0) {
          e.preventDefault();
          selectUser(users[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className="max-w-xl">
      <label htmlFor="user-search" className="mb-2 block text-sm font-medium text-slate-700">
        Search users
      </label>

      <div className="relative">
        <input
          id="user-search"
          ref={inputRef}
          type="text"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none ring-0 transition focus:border-blue-500"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(-1);
          }}
          onFocus={() => users.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined
          }
          aria-haspopup="listbox"
          autoComplete="off"
          placeholder="Type a name..."
        />

        {loading && (
          <div className="mt-2 text-sm text-slate-500">Loading suggestions...</div>
        )}

        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

        {isOpen && users.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
          >
            {users.map((user, index) => (
              <li
                key={user.id}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={cn(
                  'cursor-pointer rounded-xl px-3 py-3 text-sm',
                  highlightedIndex === index ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectUser(user)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="font-medium">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}