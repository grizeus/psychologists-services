import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import useStore from "./store";
import { db } from "../firebase/firebase";

const LIMIT = 3;
const collectionName = "psychologists";

export const setFilter = filter => {
  useStore.setState({ curFilter: filter });
};

const getDataCollection = () => {
  return useStore.getState().dataCollection;
};
const getFavCollection = () => {
  return useStore.getState().favsCollection;
};

export const fetchCollection = async () => {
  useStore.setState({ isLoading: true, error: null });
  const dataCollection = getDataCollection();
  const collectionRef = collection(db, collectionName);
  const lastDoc = useStore.getState().lastDoc;
  try {
    // setup query whenever it first fetch or load more data
    const q = lastDoc
      ? query(collectionRef, startAfter(lastDoc), limit(LIMIT))
      : query(collectionRef, limit(LIMIT));
    const count = await getCountFromServer(collectionRef);
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) {
      useStore.setState({ isMoreData: false, isLoading: false });
      return;
    }
    const fetchedData = snapshot.docs.map(doc => ({
      id: doc.id,
      isFavorite: false,
      ...doc.data(),
    }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    useStore.setState({
      lastDoc: lastVisible,
      dataCollection: [...dataCollection, ...fetchedData],
      total: count.data().count,
      isLoading: false,
    });
  } catch (e) {
    console.log(e);
    useStore.setState({ error: e.message, loading: false });
  }
};

export const fetchFavorites = async () => {
  useStore.setState({ isLoading: true, error: null });
  const collectionRef = collection(db, collectionName);
  const dataCollection = getFavCollection();
  const lastDoc = useStore.getState().lastFavDoc;
  try {
    const q = lastDoc
      ? query(
          collectionRef,
          startAfter(lastDoc),
          where("isFavorite", "==", true),
          limit(LIMIT)
        )
      : query(collectionRef, where("isFavorite", "==", true), limit(LIMIT));
    const count = await getCountFromServer(
      query(collectionRef, where("isFavorite", "==", true))
    );
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) {
      useStore.setState({ isMoreFavData: false, isLoading: false });
      return;
    }
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const fetchedData = snapshot.docs.map(doc => ({
      id: doc.id,
      isFavorite: false,
      ...doc.data(),
    }));
    useStore.setState({
      lastFavDoc: lastVisible,
      favsCollection: [...dataCollection, ...fetchedData],
      totalFavs: count.data().count,
      isLoading: false,
    });
  } catch (e) {
    console.log(e);
    useStore.setState({ error: e.message, loading: false });
  }
};

export const toggleFavorite = favId => {
  useStore.setState({ isLoading: true, error: null });
  const data = getDataCollection();
  const favs = getFavCollection();
  const curDoc =
    data.filter(item => item.id === favId)[0] ||
    favs.filter(item => item.id === favId)[0];
  const collectionRef = collection(db, collectionName);
  const docRef = doc(collectionRef, favId);
  try {
    updateDoc(docRef, {
      isFavorite: !curDoc.isFavorite,
    });
    const updatedData = data.map(item => {
      return item.id === favId
        ? { ...item, isFavorite: !item.isFavorite }
        : item;
    });
    let updatedFavData;
    if (curDoc.isFavorite) {
      updatedFavData = favs.filter(item => item.id !== favId);
    } else {
      updatedFavData = favs.map(item => {
        return item.id === favId
          ? { ...item, isFavorite: !item.isFavorite }
          : item;
      });
    }
    useStore.setState({
      dataCollection: updatedData,
      favsCollection: updatedFavData,
      isLoading: false,
    });
  } catch (e) {
    console.error("Error updating favorite status in Firestore:", e);
    useStore.setState({
      error: e.message,
      isLoading: false,
      dataCollection: data,
    });
  }
};
