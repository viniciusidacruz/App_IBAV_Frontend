import React, { useContext } from "react";
import { AuthContext } from "../contexts/Authenticate";

export function useAuth() {
  const user = useContext(AuthContext);

  return user;
}
