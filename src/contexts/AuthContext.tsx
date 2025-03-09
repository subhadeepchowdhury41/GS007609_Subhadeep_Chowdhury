import { createContext, useEffect, useState } from "react";

export interface User {
  email: string;
  id: string;
  name: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const login = async (email: string, password: string) => {
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (email === "analyst@gsynergy.com" && password === "123456") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: "analyst@gsynergy.com",
          id: "1",
          name: "Analyst",
          token: "123456",
        })
      );
      setUser({
        email: "analyst@gsynergy.com",
        id: "1",
        name: "Analyst",
        token: "123456",
      });
    } else {
      setError("Invalid credentials");
    }
  };
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      setUser(user);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
