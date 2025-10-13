import { createContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import { UserRole } from "@/graphql/graphql";
import type { User, Firm } from "@/graphql/graphql";
import { execute } from "@/graphql/execute";
import { GetMeDocument } from "@/graphql/graphql";

// Types

interface AuthState {
  user: User | null;
  firm: Firm | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
  refetchUser: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
}

// Action types
type AuthAction =
  | { type: "SET_TOKEN"; payload: string }
  | { type: "SET_USER_DATA"; payload: { user: User; firm: Firm } }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  firm: null,
  token: null,
  loading: true,
};

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
        // Keep loading true until user data is fetched
        loading: true,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        user: action.payload.user,
        firm: action.payload.firm,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fetch user data with token
  const fetchUserData = async (token: string) => {
    try {
      // Store token temporarily if not already in localStorage
      // This handles the case during login when token is not yet stored
      const existingToken = localStorage.getItem("token");
      if (!existingToken) {
        localStorage.setItem("token", token);
      }

      const response = await execute(GetMeDocument, {});

      if (response.data?.me) {
        // Type assertion since GetMeQuery returns a subset of User/Firm fields
        const user = response.data.me as User;
        const firm = response.data.me.firm as Firm;
        dispatch({ type: "SET_USER_DATA", payload: { user, firm } });
      } else {
        throw new Error("No user data returned");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // If fetching user data fails, logout
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    }
  };

  // Restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Set token and keep loading true
          dispatch({ type: "SET_TOKEN", payload: token });
          // Fetch user data - this will set loading to false when done
          await fetchUserData(token);
        } else {
          // No token found, set loading to false
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Error restoring session:", error);
        localStorage.removeItem("token");
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    restoreSession();
  }, []);

  // Context methods
  const login = async (token: string) => {
    // Store token in localStorage
    localStorage.setItem("token", token);

    // Update state
    dispatch({ type: "SET_TOKEN", payload: token });

    // Fetch user data
    await fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const refetchUser = async () => {
    if (state.token) {
      await fetchUserData(state.token);
    }
  };

  const isAuthenticated = !!state.token && !!state.user;
  const isAdmin = state.user?.role === UserRole.Admin;
  const isStaff = state.user?.role === UserRole.Staff;

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    refetchUser,
    isAuthenticated,
    isAdmin,
    isStaff,
  };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}

export { AuthContext };
