import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
  updateDoc,
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

export const fetchCollection = async () => {
  useStore.setState({ isLoading: true, error: null });
  const dataCollection = getDataCollection();
  const lastDoc = useStore.getState().lastDoc;
  try {
    // setup query whenever it first fetch or load more data
    const q = lastDoc
      ? query(collection(db, collectionName), startAfter(lastDoc), limit(LIMIT))
      : query(collection(db, collectionName), limit(LIMIT));
    const count = await getCountFromServer(collection(db, collectionName));
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

export const toggleFavorite = favId => {
  useStore.setState({ isLoading: true, error: null });
  const data = getDataCollection();
  const curDoc = data.filter(item => item.id === favId)[0];
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
    useStore.setState({
      dataCollection: updatedData,
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
