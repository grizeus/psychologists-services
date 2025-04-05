import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useStore from "../store";
import { setPostloading, setPreloading } from "../root/operations";

export const registerUser = async ({ name, email, password }) => {
  try {
    setPreloading();
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
    setPostloading();
  } catch (e) {
    console.error("Error registering user:", e.message);
    setPostloading(e);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    setPreloading();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    useStore.setState({ user: user });
    setPostloading();
  } catch (e) {
    console.error("Error logging in user:", e.message);
    setPostloading(e);
  }
};

export const logoutUser = async () => {
  try {
    setPreloading();
    await signOut(auth);
    useStore.setState({
      user: null,
      favsCollection: [],
      generalFavsCollection: [],
      actualFavs: [],
      totalFavs: 0,
      lastFavDoc: null,
      isMoreFavData: true,
    });
    setPostloading();
  } catch (e) {
    console.error("Error logging out user:", e.message);
    setPostloading(e);
  }
};
