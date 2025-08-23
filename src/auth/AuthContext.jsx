// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     const stored = localStorage.getItem("jwtToken");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const login = (data) => {
//     localStorage.setItem("jwtToken", JSON.stringify(data));
//     setAuth(data);
//   };

//   const logout = () => {
//     localStorage.removeItem("jwtToken");
//     setAuth(null);
//   };

//   const hasRole = (role) => {
//     return auth?.role === role;
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout, hasRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Get stored auth data from state instead of localStorage
    return null;
  });

  const login = (data) => {
    // Store the user data in state only
    setAuth(data);
  };

  const logout = () => {
    setAuth(null);
  };

  const hasRole = (role) => {
    return auth?.role === role;
  };

  const getAuthHeaders = () => {
    if (auth?.token) {
      return {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      };
    }
    return {
      'Content-Type': 'application/json'
    };
  };

  return (
    <AuthContext.Provider value={{ 
      auth, 
      login, 
      logout, 
      hasRole, 
      getAuthHeaders 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);