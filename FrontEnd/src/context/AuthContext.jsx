import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
  };

  const fetchProfile = async (tok = token) => {
    if (!tok) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/users/userRegister/user-Profile", {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          logout();
        }
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      // API shape might be { user: user } or { data: user } or directly user
      const userPayload = data?.user || data?.data || data;
      // If the API wrapped the user object (e.g., { user: { ... } }), unwrap it
      setUser(userPayload?.user || userPayload);
    } catch (err) {
      console.error("Auth fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (newToken) => {
    if (!newToken) return;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    await fetchProfile(newToken);
  };

  // On mount, if token exists, fetch profile
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
