import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../api/authService';
import { User, Mail, Lock } from 'lucide-react';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = useAuthStore((state) => state.login); 
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.register({ username, email, password });
      
      if (response.data) {
        login(response.data.user, response.data.access_token); 
      }

      navigate('/');
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Произошла ошибка при регистрации';
        
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>Create Account</h1>
          <p style={{
            fontSize: '14px',
            color: '#6b7280'
          }}>Join us to manage your finances</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* Username Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>Userame</label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <User size={18} style={{
                position: 'absolute',
                left: '12px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#ffffff',
                  color: '#111827'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#111827'
                  e.currentTarget.style.backgroundColor = '#fafafa'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.backgroundColor = '#ffffff'
                }}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>Email Address</label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '12px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#ffffff',
                  color: '#111827'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#111827'
                  e.currentTarget.style.backgroundColor = '#fafafa'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.backgroundColor = '#ffffff'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>Password</label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '12px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />              
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#ffffff',
                  color: '#111827'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#111827'
                  e.currentTarget.style.backgroundColor = '#fafafa'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.backgroundColor = '#ffffff'
                }}
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>Confirm Password</label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '12px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />                
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: '#ffffff',
                  color: '#111827'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#111827'
                  e.currentTarget.style.backgroundColor = '#fafafa'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.backgroundColor = '#ffffff'
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#dc2626'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? '#d1d5db' : '#111827',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#1f2937'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#111827'
              }
            }}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '32px 0',
          opacity: 0.5
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
          <span style={{ fontSize: '13px', color: '#6b7280' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
        </div>

        {/* Login Link */}
        <div style={{
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>Already have an account?</p>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              color: '#111827',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1f2937'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#111827'
            }}
          >
            <Link to="/login">Sign in</Link>
          </button>
        </div>
      </div>
    </div>
  )
}