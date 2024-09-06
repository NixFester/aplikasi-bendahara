import React, { useState } from 'react';
import { db } from '../firebase';
import './TransactionForm.css';

const TransactionForm = ({ refreshTransactions }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Income');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description && amount && date) {
      const transaction = { description, amount: parseFloat(amount), date, category };

      try {
        await db.collection('transactions').add(transaction);

        // Update current funds
        const fundsDoc = await db.collection('funds').doc('current').get();
        const currentFunds = fundsDoc.exists ? fundsDoc.data().amount : 9000;
        const newFunds = category === 'Income' ? currentFunds + transaction.amount : currentFunds - transaction.amount;

        await db.collection('funds').doc('current').set({ amount: newFunds });
        refreshTransactions();
        setDescription('');
        setAmount('');
        setDate('');
        setCategory('Income');
      } catch (error) {
        console.error('Error adding transaction: ', error);
      }
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Income">Income</option>
        <option value="Outcome">Outcome</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
