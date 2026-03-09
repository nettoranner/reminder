import { Coffee, ShoppingBag, Zap, MapPin } from 'lucide-react'

interface Expense {
  id: number
  title: string
  category: string
  amount: number
  time: string
  icon: React.ComponentType<{ size: number; className: string }>
}

const expenses: Expense[] = [
  {
    id: 1,
    title: 'Coffee Shop',
    category: 'Food & Dining',
    amount: 5.50,
    time: '08:30 AM',
    icon: Coffee,
  },
  {
    id: 2,
    title: 'Grocery Store',
    category: 'Shopping',
    amount: 62.35,
    time: '11:45 AM',
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: 'Electric Bill',
    category: 'Utilities',
    amount: 125.00,
    time: '2:15 PM',
    icon: Zap,
  },
  {
    id: 4,
    title: 'Uber',
    category: 'Transportation',
    amount: 18.75,
    time: '4:30 PM',
    icon: MapPin,
  },
]

export const RecentExpenses = () => {
  const totalToday = expenses.reduce((sum, exp) => sum + exp.amount, 0)

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
        }}>Today's Expenses</h3>
        <span style={{
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280'
        }}>${totalToday.toFixed(2)}</span>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {expenses.map((expense) => {
          const Icon = expense.icon
          return (
            <div
              key={expense.id}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flex: 1
              }}>
                <div style={{
                  padding: '8px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px'
                }}>
                  <Icon size={18} style={{ color: '#4b5563' }} />
                </div>
                <div style={{
                  flex: 1,
                  minWidth: 0
                }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#111827'
                  }}>{expense.title}</p>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>{expense.time}</p>
                </div>
              </div>
              <div style={{
                textAlign: 'right'
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827'
                }}>${expense.amount.toFixed(2)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
