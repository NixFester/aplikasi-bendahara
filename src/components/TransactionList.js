import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import './TransactionList.css';

const TransactionList = ({ setCurrentFunds }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('transactions').orderBy('date', 'desc').get();
      const transactionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(transactionsData);

      // Update current funds
      const fundsDoc = await db.collection('funds').doc('current').get();
      const currentFunds = fundsDoc.exists ? fundsDoc.data().amount : 9000;
      setCurrentFunds(currentFunds);
    };

    fetchData();
  }, [setCurrentFunds]);

  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <strong>{transaction.date}:</strong> {transaction.description} - ${transaction.amount.toFixed(2)} ({transaction.category})
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
