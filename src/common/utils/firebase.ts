import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function handleSignOut() {
  auth.signOut().then(() => alert("Você está deslogado"));
  AsyncStorage.removeItem("@storage_User");
  AsyncStorage.removeItem("@storage_dataUser");
  AsyncStorage.removeItem("@storage_members");
}
