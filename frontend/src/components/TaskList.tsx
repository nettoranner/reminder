import { CheckCircle2, Circle } from 'lucide-react'
import { useState } from 'react'

interface Task {
  id: number
  title: string
  completed: boolean
}

const initialTasks: Task[] = [
  { id: 1, title: 'Review monthly budget', completed: false },
  { id: 2, title: 'Pay utilities', completed: true },
  { id: 3, title: 'Schedule dentist appointment', completed: false },
  { id: 4, title: 'Update expense categories', completed: false },
]

export const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '24px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827'
        }}>Tasks</h3>
        <span style={{
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280'
        }}>{completedCount}/{tasks.length}</span>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s',
              textAlign: 'left'
            }}
          >
            {task.completed ? (
              <CheckCircle2 size={20} style={{
                flexShrink: 0,
                color: '#9ca3af'
              }} />
            ) : (
              <Circle size={20} style={{
                flexShrink: 0,
                color: '#d1d5db'
              }} />
            )}
            <span style={{
              fontSize: '14px',
              color: task.completed ? '#9ca3af' : '#374151',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}>
              {task.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
