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

import { db } from "../../firebase/firebase";
import { COLLECTION_NAME, LIMIT } from "../../lib/utils/constants";
import { setPostloading, setPreloading } from "../root/operations";
import useStore from "../store";

const getDataCollection = () => {
  return useStore.getState().dataCollection;
};
const getFavCollection = () => {
  return useStore.getState().favsCollection;
};

export const fetchFavorites = async () => {
  setPreloading();
  const collectionRef = collection(db, COLLECTION_NAME);
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
      useStore.setState({ isMoreFavData: false });
      setPostloading();
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
    });
    setPostloading();
  } catch (e) {
    console.log("Error fetching favorites from Firestore:", e.message);
    setPostloading(e);
  }
};

export const toggleFavorite = favId => {
  setPreloading;
  const data = getDataCollection();
  const favs = getFavCollection();
  const curDoc =
    data.filter(item => item.id === favId)[0] ||
    favs.filter(item => item.id === favId)[0];
  const collectionRef = collection(db, COLLECTION_NAME);
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
      favsCollection: updatedFavData,
      dataCollection: updatedData,
    });
    setPostloading();
  } catch (e) {
    console.error("Error updating favorite status in Firestore:", e.message);
    // backup in case of error
    useStore.setState({
      favsCollection: favs,
      dataCollection: data,
    });
    setPostloading(e);
  }
};
