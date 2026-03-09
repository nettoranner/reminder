import { Home, TrendingUp, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore';

export const Navigation = () => {

  const logout = useAuthStore((state) => state.logout);
  
  return (
    <nav style={{
      width: '256px',
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      <div style={{ padding: '24px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#111827'
        }}>Finances</h1>
      </div>
      
      <div style={{
        flex: 1,
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <NavItem icon={Home} label="Dashboard" active />
        <NavItem icon={TrendingUp} label="Analytics" />
        <NavItem icon={Settings} label="Settings" />
      </div>
      
      <div style={{
        padding: '16px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <NavItem icon={LogOut} label="Logout" onClick={logout} />
      </div>
    </nav>
  )
}

interface NavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<{ size: number; className: string }>
  label: string
  active?: boolean
  style?: React.CSSProperties
} 

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active = false, style, ...props }) => {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: active ? '#111827' : 'transparent',
    color: active ? 'white' : '#4b5563',
    ...style
  }

  return (
    <button style={baseStyle} onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.backgroundColor = '#f9fafb'
    }} onMouseLeave={(e) => {
      if (!active) e.currentTarget.style.backgroundColor = 'transparent'
    }}
    {...props}
    >
      <Icon size={20} style={{ flexShrink: 0 }} />
      <span>{label}</span>
    </button>
  )
}
