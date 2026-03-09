import { TrendingDown } from 'lucide-react'

export const RemainingFunds = () => {
  const budget = 2000
  const spent = 1250.60
  const remaining = budget - spent
  const percentage = (spent / budget) * 100

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f3f4f6 0%, white 100%)',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '32px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <div>
          <p style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#4b5563',
            marginBottom: '8px'
          }}>Remaining Budget</p>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#111827'
          }}>${remaining.toFixed(2)}</h2>
        </div>
        <div style={{
          padding: '12px',
          backgroundColor: '#111827',
          borderRadius: '8px'
        }}>
          <TrendingDown size={24} style={{ color: 'white' }} />
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px'
        }}>
          <span style={{ color: '#4b5563' }}>Monthly Budget</span>
          <span style={{
            fontWeight: '600',
            color: '#111827'
          }}>${budget.toFixed(2)}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px'
        }}>
          <span style={{ color: '#4b5563' }}>Spent</span>
          <span style={{
            fontWeight: '600',
            color: '#111827'
          }}>${spent.toFixed(2)}</span>
        </div>

        <div style={{
          height: '12px',
          backgroundColor: '#d1d5db',
          borderRadius: '9999px',
          overflow: 'hidden',
          marginTop: '16px'
        }}>
          <div
            style={{
              height: '100%',
              backgroundColor: '#111827',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              width: `${percentage}%`
            }}
          />
        </div>

        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'right'
        }}>{Math.round(percentage)}% spent</p>
      </div>
    </div>
  )
}
