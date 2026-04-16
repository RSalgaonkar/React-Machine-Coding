import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Check, Database } from 'lucide-react'
import { useState, useTransition, Suspense } from 'react'
import styles from '../components/playground/Playground.module.css'

interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const mockTodos: Todo[] = [
  { 
    id: '1', 
    text: 'Master TanStack Query v5 caching', 
    completed: false, 
    priority: 'high' 
  },
  { 
    id: '2', 
    text: 'Implement optimistic mutations', 
    completed: true, 
    priority: 'high' 
  },
]

function TodoList({ 
  todos, 
  onToggle, 
  onDelete 
}: { 
  todos: Todo[] 
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <AnimatePresence>
      {todos.map(todo => (
        <motion.li
          key={todo.id}
          className={styles.todoItem}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          layout
        >
          <button onClick={() => onToggle(todo.id)}>
            {todo.completed ? <Check /> : <div className={styles.checkbox} />}
          </button>
          <span className={todo.completed ? styles.completed : ''}>
            {todo.text}
          </span>
          <span className={styles.priority}>{todo.priority}</span>
          <button onClick={() => onDelete(todo.id)}>
            <Trash2 size={16} />
          </button>
        </motion.li>
      ))}
    </AnimatePresence>
  )
}

export default function PlaygroundPage() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)
  const [input, setInput] = useState('')
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      return {
        id: crypto.randomUUID(),
        text,
        completed: false,
        priority: 'high' as const,
      }
    },
    onMutate: async (newTodoText) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      
      const optimisticTodo = {
        id: crypto.randomUUID(),
        text: newTodoText,
        completed: false,
        priority: 'high' as const,
      }

      queryClient.setQueryData(['todos'], (old = []) => [...old, optimisticTodo])
      
      return { previousTodos }
    },
    onError: (err, newTodoText, context) => {
      // Rollback on error
      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    onSettled: () => {
      // Always refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      new Promise<Todo>(resolve =>
        setTimeout(() => resolve({} as Todo), 300)
      ),
    onMutate: ({ id, completed }) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData(['todos'], (old = []) =>
        old.map(todo => 
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      )
      return { previousTodos }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      new Promise(resolve => setTimeout(resolve, 200)),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData(['todos'], (old = []) =>
        old.filter(todo => todo.id !== id)
      )
      return { previousTodos }
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
  })

  return (
    <section className="page">
      <h2>🚀 Modern React + TanStack Query Playground</h2>
      
      <div className={styles.demoCard}>
        <div className={styles.addTodo}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add todo with optimistic update..."
            className={styles.input}
            disabled={addTodoMutation.isPending}
          />
          <button
            onClick={() => {
              if (input.trim()) {
                addTodoMutation.mutate(input.trim())
                setInput('')
              }
            }}
            disabled={!input.trim() || addTodoMutation.isPending}
            className="btn"
          >
            {addTodoMutation.isPending ? '⏳' : <Plus />}
          </button>
        </div>

        <Suspense fallback={<div>Loading todos...</div>}>
          <TodoList
            todos={todos.filter(t => !t.completed)}
            onToggle={(id) =>
              toggleMutation.mutate({ id, completed: todos.find(t => t.id === id)?.completed || false })
            }
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        </Suspense>

        <div className={styles.mutationStatus}>
          <span>Add: {addTodoMutation.status}</span>
          <span>Toggle: {toggleMutation.status}</span>
          <span>Delete: {deleteMutation.status}</span>
        </div>
      </div>

      <div className={styles.features}>
        <h3>Production Features Demonstrated:</h3>
        <div className={styles.featureGrid}>
          <div>🔥 TanStack Query v5 Mutations</div>
          <div>⚡ Optimistic Updates</div>
          <div>🔄 Automatic Rollback</div>
          <div>📊 DevTools Integration</div>
          <div>⏱️ Stale Time Caching</div>
          <div>🔮 Concurrent Rendering</div>
        </div>
      </div>

      {/* DevTools will appear automatically in bottom-right */}
      <div style={{ marginTop: '2rem', fontSize: '14px', color: '#666' }}>
        💡 Open DevTools (bottom-right) to inspect queries, cache, and mutations live!
      </div>
    </section>
  )
}