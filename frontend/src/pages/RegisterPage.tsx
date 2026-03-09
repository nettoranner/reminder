import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../api/authService';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Регистрация</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          disabled={isLoading}
        />
        <input 
          type="username" 
          placeholder="username" 
          required 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          disabled={isLoading}
        />        
        <input 
          type="password" 
          placeholder="Пароль" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          disabled={isLoading}
        />
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      
      <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </div>
  );
};