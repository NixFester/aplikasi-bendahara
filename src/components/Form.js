// src/components/Form.js
import React, { useState, useEffect } from "react";
import { db, doc, getDoc, updateDoc, collection, addDoc } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AmountControl from "./AmountControl";

const Form = () => {
  const [category, setCategory] = useState("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0); // Amount state managed by AmountControl
  const [date, setDate] = useState(new Date());
  const [funds, setFunds] = useState(0);

  useEffect(() => {
    // Fetch current balance
    const fetchBalance = async () => {
      const balanceRef = doc(db, "Balance", "balance");
      const balanceDoc = await getDoc(balanceRef);
      if (balanceDoc.exists()) {
        setFunds(balanceDoc.data().funds);
      }
    };
    fetchBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      perihal: description,
      nominal: Number(amount),
      waktu: date
    };

    try {
      const balanceRef = doc(db, "Balance", "balance");

      if (category === "income") {
        // Add to income collection
        await addDoc(collection(db, "Balance", "balance", "income"), newTransaction);
        // Update funds
        await updateDoc(balanceRef, {
          funds: funds + Number(amount),
        });
      } else {
        // Add to outcome collection
        await addDoc(collection(db, "Balance", "balance", "outcome"), newTransaction);
        // Update funds
        await updateDoc(balanceRef, {
          funds: funds - Number(amount),
        });
      }
      // Reset form
      setDescription("");
      setAmount(0);
      setDate(new Date());
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>
      </div>

      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Date:</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      {/* Include the new AmountControl component */}
      <AmountControl amount={amount} setAmount={setAmount} />

      <button type="submit">Submit</button>
      <p>Current Funds: {funds}</p>
    </form>
  );
};

export default Form;
