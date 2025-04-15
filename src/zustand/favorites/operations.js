import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import {
  COLLECTION_NAME,
  FAV_COLLECTION_NAME,
  FETCH_LIMIT,
  LIMIT,
} from "../../lib/utils/constants";
import useStore from "../store";

export const fetchAllFavorites = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User is not authenticated");
    return;
  }
  const collectionRef = collection(db, FAV_COLLECTION_NAME);
  try {
    const q = query(collectionRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) {
      return;
    }
    const fetchedData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    useStore.setState({
      favorites: fetchedData,
    });
  } catch (e) {
    console.error("Error fetching favorites from Firestore:", e.message);
  }
};

export const toggleFavorite = async (favId, queryClient, isCurrentlyFav) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User is not authenticated");
  }
  const favorites = useStore.getState().favorites;

  try {
    if (isCurrentlyFav) {
      const q = query(
        collection(db, FAV_COLLECTION_NAME),
        where("userId", "==", user.uid),
        where("favId", "==", favId),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const idToDelete = snapshot.docs[0].id;
        await deleteDoc(doc(db, FAV_COLLECTION_NAME, idToDelete));

        await queryClient.invalidateQueries({ queryKey: ["favorites"] });
        const updatedGeneralFavData = favorites.filter(
          item => item.favId !== favId
        );

        useStore.setState({
          favorites: updatedGeneralFavData,
        });
      } else {
        console.warn(
          "Tried to remove favorite, but document not found in Firestore."
        );
        await queryClient.invalidateQueries({ queryKey: ["favorites"] });
        const updatedGeneralFavData = favorites.filter(
          item => item.favId !== favId
        );
        useStore.setState({
          favorites: updatedGeneralFavData,
        });
      }
    } else {
      await addDoc(collection(db, FAV_COLLECTION_NAME), {
        userId: user.uid,
        favId: favId,
      });
      console.log(`Favorite added for psychologist ${favId}`);

      await queryClient.invalidateQueries({ queryKey: ["favorites"] });

      const optimisticNewFav = {
        userId: user.uid,
        favId: favId,
      };
      useStore.setState({
        favorites: [...favorites, optimisticNewFav],
      });
    }
  } catch (e) {
    console.error("Error toggling favorite:", e.message);
  }
};
