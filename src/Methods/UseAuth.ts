import { createContext, useContext } from "react";
import AuthContextType from "../Interfaces/IAuthContextType";

export const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}