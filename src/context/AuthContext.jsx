import { createContext, useContext, useEffect, useState } from 'react';
import * as userSer from '../services/user-services';
import * as auth from '../services/auth-services';
import { tokenKey } from '../config';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [statusError, setErrorLogin] = useState({
    login: {},
    signUp: {},
    
  });

  useEffect(() => {
    userSer
      .getUser()
      .then((u) => setUser(u))
      .catch(console.log);
  }, []);

  function login(credentials) {
    auth
      .login(credentials)
      .then((u) => setUser(u))
      .catch((error) => setErrorLogin(error));
  }

  function logout() {
    auth
      .logout()
      .then(() => {
        sessionStorage.removeItem(tokenKey);
        setUser(null);
      })
      .catch(console.log);
  }

  function signUp(userData) {
    userSer
      .createUser(userData)
      .then((u) => setUser(u))
      .catch(console.log);
  }

  function upDate(userData) {
    userSer
      .upDateUser(userData)
      .then((u) => setUser(u))
      .catch(console.log);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signUp, upDate, errorLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
