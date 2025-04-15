import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useStore from "../store";

export const registerUser = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });
    useStore.setState({ user: user });
  } catch (e) {
    console.error("Error registering user:", e.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    useStore.setState({ user: user });
  } catch (e) {
    console.error("Error logging in user:", e.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    useStore.setState({
      user: null,
      favsCollection: [],
      curFilter: "Show all",
    });
  } catch (e) {
    console.error("Error logging out user:", e.message);
  }
};
