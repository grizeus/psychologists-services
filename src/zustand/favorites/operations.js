import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import { COLLECTION_NAME, FAV_COLLECTION_NAME, LIMIT } from "../../lib/utils/constants";
import { setPostloading, setPreloading } from "../root/operations";
import useStore from "../store";

const getFavCollection = () => {
  return useStore.getState().favsCollection;
};

export const fetchFavorites = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User is not authenticated");
    return;
  }
  setPreloading();
  const favCollectionRef = collection(db, FAV_COLLECTION_NAME);
  const collectionRef = collection(db, COLLECTION_NAME);
  const dataCollection = getFavCollection();
  const lastDoc = useStore.getState().lastFavDoc;
  const actualFavs = useStore.getState().actualFavs;
  try {
    const favQ = lastDoc
      ? query(
          favCollectionRef,
          startAfter(lastDoc),
          where("userId", "==", user.uid),
          limit(LIMIT)
        )
      : query(favCollectionRef, where("userId", "==", user.uid), limit(LIMIT));

      const snapshot = await getDocs(favQ);
      if (snapshot.docs.length === 0) {
        useStore.setState({ isMoreFavData: false });
        setPostloading();
        return;
      }
      
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    
    const filtered = fetchedData.map(item => item.favId);
    console.log("filtered", filtered);
      const actualQ = query(collectionRef, where("id", "in", filtered));
      const actualSnapshot = await getDocs(actualQ);
      if (actualSnapshot.docs.length === 0) { 
        console.error("No documents found in the actual collection for the given favId.");
        setPostloading();
    }
    
    const actualData = actualSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
      
    useStore.setState({
      lastFavDoc: lastVisible,
      favsCollection: [...dataCollection, ...fetchedData],
      actualFavs: [...actualFavs, ...actualData],
    });
    setPostloading();
  } catch (e) {
    console.log("Error fetching favorites from Firestore:", e.message);
    setPostloading(e);
  }
};

export const fetchAllFavorites = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User is not authenticated");
    return;
  }
  setPreloading();
  const collectionRef = collection(db, FAV_COLLECTION_NAME);
  try {
    const q = query(collectionRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) {
      useStore.setState({ isMoreFavData: false });
      setPostloading();
      return;
    }
    const fetchedData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    useStore.setState({
      generalFavsCollection: fetchedData,
      totalFavs: fetchedData.length,
    });
    setPostloading();
  } catch (e) {
    console.log("Error fetching favorites from Firestore:", e.message);
    setPostloading(e);
  }
};

export const toggleFavorite = async favId => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User is not authenticated");
  }
  const favs = getFavCollection();
  const generalFavs = useStore.getState().generalFavsCollection;
  const actualFavs = useStore.getState().actualFavs;

  const q = query(
    collection(db, FAV_COLLECTION_NAME),
    where("userId", "==", user.uid),
    where("favId", "==", favId),
    limit(1)
  );
  try {
    setPreloading();

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const target = snapshot.docs[0];
      
      await deleteDoc(doc(db, FAV_COLLECTION_NAME, target.id));

      const updatedFavData = favs.filter(item => item.favId !== favId);
      const updatedGeneralFavData = generalFavs.filter(
        item => item.favId !== favId
      );
      const updatedActualFavs = actualFavs.filter(
        item => item.id !== favId
      );
      
      useStore.setState({
        favsCollection: updatedFavData,
        generalFavsCollection: updatedGeneralFavData,
        totalFavs: updatedGeneralFavData.length,
        actualFavs: updatedActualFavs,
      });
      setPostloading();
      
    } else {
      await addDoc(collection(db, FAV_COLLECTION_NAME), {
        userId: user.uid,
        favId: favId,
      });
      useStore.setState({
        favsCollection: [...favs, { userId: user.uid, favId: favId }],
        generalFavsCollection: [
          ...generalFavs,
          { userId: user.uid, favId: favId },
        ],
        totalFavs: generalFavs.length + 1,
      });
      setPostloading();
    }
  } catch (e) {
    console.error("Error toggling favorite:", e.message);
    setPostloading(e);
  }
};
