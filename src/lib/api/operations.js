import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import { COLLECTION_NAME, LIMIT, FETCH_LIMIT, FAV_COLLECTION_NAME } from "../utils/constants";

export const fetchPsychologists = async ({ pageParam = null }) => {
  const collectionRef = collection(db, COLLECTION_NAME);
  const q = pageParam
    ? query(collectionRef, startAfter(pageParam), limit(FETCH_LIMIT))
    : query(collectionRef, limit(FETCH_LIMIT));
  try {
    const snapshot = await getDocs(q);

    let nextPageParam = undefined;
    let docsForCurrentPage = snapshot.docs;

    if (snapshot.docs.length === FETCH_LIMIT) {
      nextPageParam = snapshot.docs[LIMIT - 1];
      docsForCurrentPage = snapshot.docs.slice(0, LIMIT);
    } else {
      nextPageParam = undefined;
    }

    if (docsForCurrentPage.length === 0) {
      return { data: [], nextPageParam: undefined };
    }

    if (snapshot.empty) {
      return { data: [], nextPageParam: undefined };
    }

    const fetchedData = docsForCurrentPage.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data: fetchedData, nextPageParam: nextPageParam };
  } catch (e) {
    console.error("Error fetching psychologists from Firestore:", e.message);
  }
};

export const fetchFavorites = async ({ pageParam = null }) => {
  const user = auth.currentUser;
  if (!user) {
    console.error(
      "fetchFavoritesPageFromFirestore called without authenticated user."
    );
    throw new Error("User not authenticated.");
  }

  const favCollectionRef = collection(db, FAV_COLLECTION_NAME);
  const actualCollectionRef = collection(db, COLLECTION_NAME);

  const favQuery = pageParam
    ? query(
        favCollectionRef,
        where("userId", "==", user.uid),
        startAfter(pageParam),
        limit(FETCH_LIMIT)
      )
    : query(
        favCollectionRef,
        where("userId", "==", user.uid),
        limit(FETCH_LIMIT)
      );

  try {
    const favSnapshot = await getDocs(favQuery);

    let nextPageParam = undefined;
    let docsForCurrentPage = favSnapshot.docs;

    if (favSnapshot.docs.length === FETCH_LIMIT) {
      nextPageParam = favSnapshot.docs[LIMIT - 1];
      docsForCurrentPage = favSnapshot.docs.slice(0, LIMIT);
    } else {
      nextPageParam = undefined;
    }
    if (docsForCurrentPage.length === 0) {
      return { data: [], nextPageParam: undefined };
    }
    if (favSnapshot.empty) {
      return { data: [], nextPageParam: undefined };
    }

    const favoriteIds = docsForCurrentPage
      .map(doc => doc.data().favId)
      .filter(id => id);

    if (favoriteIds.length > 30) {
      console.warn(
        `Firestore 'in' query limit (30) exceeded. Requested ${favoriteIds.length}. Data might be incomplete. Consider reducing LIMIT or implementing batching.`
      );
      favoriteIds.length = 30;
    }

    if (favoriteIds.length === 0) {
      console.log("RQ: No valid favorite IDs extracted for this page.");
      return { data: [], nextPageParam: nextPageParam };
    }

    const actualQuery = query(
      actualCollectionRef,
      where("id", "in", favoriteIds)
    );
    const actualSnapshot = await getDocs(actualQuery);

    if (actualSnapshot.empty) {
      console.warn(
        `RQ: No psychologist documents found for favorite IDs: [${favoriteIds.join(", ")}]`
      );
      return { data: [], nextPageParam: nextPageParam };
    }

    const actualData = actualSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data: actualData, nextPageParam: nextPageParam };
  } catch (error) {
    console.error("RQ: Error fetching favorites page from Firestore:", error);
    throw error;
  }
};