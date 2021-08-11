import {
  createContext, useContext, useMemo, useState,
} from 'react';

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState('');
  const value = useMemo(() => [user, setUser], [user]);
  return (
    <AuthContext.Provider
      value={value}
      {...props}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  const [user, setUser] = context;
  return {
    user,
    setUser,
  };
}

export { AuthProvider, useAuth };
