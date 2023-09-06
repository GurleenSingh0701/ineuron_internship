import { useState, createContext, useContext } from "react";
import axios from "axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const Login = (user) => {
    setUser(user);
    console.log("The user is",);
  };
  const Logout = () => {
    axios.get("/logout").then((response) => {
      console.log(response);
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
