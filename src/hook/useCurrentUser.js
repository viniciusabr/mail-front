import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded); // decoded deve conter user_adm
        setToken(storedToken);
      } catch (error) {
        console.error("Token inválido", error);
        setUser(null);
        setToken(null);
      }
    } else {
      setUser(null);
      setToken(null);
    }
  }, []);

  return { user, token };
};
