import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '../../hooks/useDebounce'
import { usersApi, User } from '../../lib/api'
import { useCallback, useState } from 'react'
import styles from './AutoComplete.module.css'

export default function AutoComplete() {
  const [query, setQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  
  const debouncedQuery = useDebounce(query, 400)

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users', debouncedQuery],
    queryFn: () => usersApi.searchUsers(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!users?.length) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => 
          prev < users.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => 
          prev > 0 ? prev - 1 : users.length - 1
        )
        break
      case 'Escape':
        setHighlightedIndex(-1)
        break
    }
  }, [users])

  const selectUser = useCallback((user: User) => {
    setSelectedUser(user)
    setQuery(`${user.firstName} ${user.lastName}`)
    setHighlightedIndex(-1)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          className="input"
          placeholder="Search users (TanStack Query + DevTools)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedUser(null)
          }}
          onKeyDown={handleKeyDown}
        />
        {selectedUser && (
          <span className={styles.selected}>
            ✅ {selectedUser.email}
          </span>
        )}
      </div>

      <div className={styles.status}>
        {isLoading && <span>🔄 Loading...</span>}
        {error && <span className={styles.error}>❌ {error.message}</span>}
        {users && <span>📊 {users.length} results</span>}
      </div>

      {users && users.length > 0 && (
        <ul className={styles.dropdown} role="listbox">
          {users.map((user, index) => (
            <li
              key={user.id}
              role="option"
              aria-selected={highlightedIndex === index}
              className={[
                styles.item,
                highlightedIndex === index ? styles.highlighted : '',
              ].join(' ')}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectUser(user)}
            >
              <strong>{user.firstName} {user.lastName}</strong>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}