interface CategoryData {
  name: string
  amount: number
  percentage: number
}

const categoryData: CategoryData[] = [
  { name: 'Food & Dining', amount: 340, percentage: 28 },
  { name: 'Transportation', amount: 280, percentage: 23 },
  { name: 'Entertainment', amount: 220, percentage: 18 },
  { name: 'Shopping', amount: 280, percentage: 23 },
  { name: 'Other', amount: 130, percentage: 8 },
]

export const CategoryChart = () => {
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
      }}>Expenses by Category</h3>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {categoryData.map((category) => (
          <div key={category.name} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>{category.name}</span>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#111827'
              }}>${category.amount}</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#d1d5db',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  height: '100%',
                  backgroundColor: '#1f2937',
                  borderRadius: '9999px',
                  transition: 'all 0.3s ease',
                  width: `${category.percentage}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
