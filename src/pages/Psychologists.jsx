import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import PsychologistCard from "../components/PsychologistsCard";
import Filter from "../components/Filter";

const LIMIT = 3;

const Psychologists = () => {
  const [data, setData] = useState([]);
  const [isMoreData, setIsMoreData] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "psychologists"), limit(LIMIT));
      const count = await getCountFromServer(collection(db, "psychologists"));
      const snapshot = await getDocs(q);
      setTotal(count.data().count);
      if (snapshot.docs.length === 0) {
        setIsMoreData(false);
        return;
      }
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);
      setData(fetchedData);
    })();
  }, []);

  const loadMoreHandler = () => {
    if (!lastDoc || !isMoreData) return;
    (async () => {
      const q = query(
        collection(db, "psychologists"),
        startAfter(lastDoc),
        limit(LIMIT)
      );
      const snapshot = await getDocs(q);
      if (snapshot.docs.length === 0) {
        setIsMoreData(false);
        return;
      }
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);
      setData(prevData => [...prevData, ...fetchedData]);
    })();
  };

  return (
    <>
      <Filter />
      <ul className="mt-8 flex flex-col gap-8">
        {Array.isArray(data) &&
          data.length &&
          data.map(item => <PsychologistCard doctor={item} key={item.id} />)}
      </ul>
      {isMoreData && data.length < total && (
        <div className="flex justify-center pt-16 pb-25">
          <button
            type="button"
            className="text-snow rounded-3xlg hover:bg-sunset focus:bg-sunset bg-sun px-12 py-3.5 text-base leading-tight font-medium transition-colors duration-300 ease-in-out focus:outline-none"
            onClick={loadMoreHandler}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default Psychologists;
