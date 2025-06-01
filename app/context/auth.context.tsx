"use client";
// auth-context.tsx
import { createContext, useState, ReactNode, useContext } from "react";
import { getAllCartApi, getAllFavoriteApi, getInfoUser } from "../util/api";
import { useEffect } from "react";

// Define the structure of the user
interface User {
  email: string;
  user_name: string;
  role: string;
}

// Define the structure of the auth state
interface AuthState {
  isAuthenticated: boolean;
  user?: User;
}

// Define the structure of the context
interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;

  numberCart: number | null;
  setNumberCart: React.Dispatch<React.SetStateAction<number | null>>;
  numberFavorite: number | null;
  setNumberFavorite: React.Dispatch<React.SetStateAction<number | null>>;
  checkAdmin: () => boolean;
  checkLogin: () => boolean;
  loadingAuth: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for the wrapper
interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: {
      email: "",
      user_name: "",
      role: "",
    },
  });

  const [numberCart, setNumberCart] = useState<number | null>(null);
  const [numberFavorite, setNumberFavorite] = useState<number | null>(null);

  const [loadingAuth, setLoadingAuth] = useState(true);

  const updateNumberCart = async () => {
    const res = await getAllCartApi();
    if (res.total_quantity) {
      setNumberCart(res.total_quantity);
    } else {
      setNumberCart(0);
    }
  };
  const updateNumberFavorite = async () => {
    const res = await getAllFavoriteApi();
    if (res.data) {
      setNumberFavorite(res.data.length);
    } else {
      setNumberFavorite(0);
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        if (auth.isAuthenticated) return;

        const res = await getInfoUser();
        if (!res.message) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.email,
              user_name: res.user_name,
              role: res.role,
            },
          });
        } else {
          localStorage.removeItem("access_token");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingAuth(false);
      }
    };

    fetchAccount();
    updateNumberCart();
    updateNumberFavorite();
  }, []);

  const checkAdmin = () => {
    if (!auth.isAuthenticated) return false;
    if (auth.user?.role !== "admin") {
      return false;
    } else {
      return true;
    }
  };
  const checkLogin = () => {
    if (!auth.isAuthenticated) return false;
    if (auth.user?.role !== "user") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        setNumberCart,
        setNumberFavorite,
        numberCart,
        numberFavorite,
        checkAdmin,
        loadingAuth,
        checkLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context;
};
