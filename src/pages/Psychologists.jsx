import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import PsychologistCard from "../components/PsychologistsCard";

const Psychologists = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, "psychologists"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    })();
  }, []);

  return (
    <ul className="mt-8 flex flex-col gap-8">
      {Array.isArray(data) &&
        data.length &&
        data.map(item => <PsychologistCard doctor={item} key={item.id} />)}
    </ul>
  );
};

export default Psychologists;
