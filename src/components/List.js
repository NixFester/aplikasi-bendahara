import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore db
import { groupByMonth, numberWithCommas,sortBy } from '../fungsi/kumpulanFungsi';


const FirebaseTable = ({ collectionName }) => {
  const [data, setData] = useState([]);
  const [funds, setFunds] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db,"Balance","balance", collectionName));
      const docsArray = [];
      const balanceRef = doc(db, "Balance", "balance");
      const balanceDoc = await getDoc(balanceRef);

      querySnapshot.forEach((doc) => {
        docsArray.push(doc.data());
      });

      if (balanceDoc.exists()) {
        setFunds(balanceDoc.data().funds);
      }

      const sortedDocsArr = sortBy(docsArray,function(o){ return o.waktu })
      
      setData(groupByMonth(sortedDocsArr));
    };

    fetchData();
  }, [collectionName]);

  return (
    <div>
      <h2>
          Uang Kas: {numberWithCommas(funds)}
      </h2>
    {Object.keys(data).map((monthYear, idx) => (
      <div key={idx}>
        <h2>{monthYear}</h2>
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
            {data[monthYear].map((doc, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{numberWithCommas(doc.nominal)}</td>
                <td>{doc.perihal}</td>
                <td>{new Date(doc.waktu.seconds * 1000).toLocaleDateString('id-ID')}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>
                Total Nominal: {numberWithCommas(data[monthYear].reduce((acc, doc) => acc + doc.nominal, 0))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ))}
  </div>
  );
};

export default FirebaseTable;
