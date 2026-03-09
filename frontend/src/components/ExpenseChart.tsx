interface ChartDataPoint {
  day: string
  amount: number
}

const chartData: ChartDataPoint[] = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 180 },
  { day: 'Wed', amount: 90 },
  { day: 'Thu', amount: 240 },
  { day: 'Fri', amount: 150 },
  { day: 'Sat', amount: 200 },
  { day: 'Sun', amount: 110 },
]

const maxAmount = Math.max(...chartData.map(d => d.amount))

export const ExpenseChart = () => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '24px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '24px'
      }}>Weekly Expenses</h3>
      
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '192px',
        gap: '12px'
      }}>
        {chartData.map((data) => (
          <div key={data.day} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            flex: 1
          }}>
            <div
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
              style={{ 
                width: '100%',
                backgroundColor: '#d1d5db',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                height: `${(data.amount / maxAmount) * 160}px`,
                minHeight: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }} 
            />
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#4b5563'
            }}>{data.day}</span>
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: '24px',
        textAlign: 'right'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#6b7280'
        }}>Total: <span style={{
          fontWeight: '600',
          color: '#111827'
        }}>${chartData.reduce((sum, d) => sum + d.amount, 0)}</span></p>
      </div>
    </div>
  )
}
