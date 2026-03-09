export const Header = () => {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      paddingLeft: '32px',
      paddingRight: '32px',
      paddingTop: '24px',
      paddingBottom: '24px'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#111827'
      }}>Dashboard</h2>
      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        marginTop: '4px'
      }}>{formattedDate}</p>
    </div>
  )
}
