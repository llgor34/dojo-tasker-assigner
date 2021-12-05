import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setError(null);
          setDocument({ ...snapshot.data(), id: snapshot.id });
        } else {
          setError('no such document exists');
        }
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error };
};

export { useDocument };
