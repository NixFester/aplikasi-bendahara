import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore db

const FirebaseTable = ({ collectionName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db,"Balance","balance", collectionName));
      const docsArray = [];

      querySnapshot.forEach((doc) => {
        docsArray.push(doc.data());
      });

      setData(docsArray);
    };

    fetchData();
  }, [collectionName]);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>#</th>
          <th>Nominal</th>
          <th>Perihal</th>
          <th>Waktu</th>
        </tr>
      </thead>
      <tbody>
        {data.map((doc, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{doc.nominal}</td>
            <td>{doc.perihal}</td>
            <td>{new Date(doc.waktu.seconds * 1000).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FirebaseTable;
