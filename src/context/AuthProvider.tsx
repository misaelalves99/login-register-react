import { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, User } from './AuthContext';

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data: { user: User; message: string } = await res.json();
      if (!res.ok) throw new Error(data.message || 'Falha no login.');

      const user: User = data.user;
      setUser(user);
      localStorage.setItem('authUser', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      if (password.length < 6) {
        alert('A senha precisa ter pelo menos 6 caracteres!');
        return;
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data: { user: User; message: string } = await res.json();
      if (!res.ok) throw new Error(data.message || 'Falha no registro.');

      const user: User = data.user;
      setUser(user);
      localStorage.setItem('authUser', JSON.stringify(user));
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
