import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    AsyncStorage.getItem("@storage_User").then((response) => {
      setUser(response);
    });
  }, []);

  return {
      user
  }
}
