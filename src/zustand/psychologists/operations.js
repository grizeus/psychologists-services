import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";

import useStore from "../store";
import { db } from "../../firebase/firebase";
import { setPostloading, setPreloading } from "../root/operations";
import { COLLECTION_NAME, LIMIT } from "../../lib/utils/constants";

export const fetchCollection = async () => {
  setPreloading();
  const dataCollection = useStore.getState().dataCollection;
  const collectionRef = collection(db, COLLECTION_NAME);
  const lastDoc = useStore.getState().lastDoc;
  try {
    // setup query whenever it first fetch or load more data
    const q = lastDoc
      ? query(collectionRef, startAfter(lastDoc), limit(LIMIT))
      : query(collectionRef, limit(LIMIT));
    const count = await getCountFromServer(collectionRef);
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) {
      useStore.setState({ isMoreData: false });
      setPostloading();
      return;
    }
    const fetchedData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    useStore.setState({
      lastDoc: lastVisible,
      dataCollection: [...dataCollection, ...fetchedData],
      total: count.data().count,
    });
    setPostloading();
  } catch (e) {
    console.log(e);
    setPostloading(e);
  }
};
