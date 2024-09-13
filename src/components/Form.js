// src/components/Form.js
import React, { useState, useEffect } from "react";
import { db, doc, getDoc, updateDoc, collection, addDoc } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AmountControl from "./AmountControl";
import { numberWithCommas } from "../fungsi/kumpulanFungsi";

const Form = () => {
  const [category, setCategory] = useState("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0); // Amount state managed by AmountControl
  const [date, setDate] = useState(new Date());
  const [funds, setFunds] = useState(0);
  const [password,setPassword] = useState("");
  const [dataPass,setDataPass] = useState("");

  useEffect(() => {
    // Fetch current balance
    const fetchBalance = async () => {
      const balanceRef = doc(db, "Balance", "balance");
      const passRef = doc(db,"password","sekarang");
      const passDoc = await getDoc(passRef);
      const balanceDoc = await getDoc(balanceRef);

      if (balanceDoc.exists()) {
        setFunds(balanceDoc.data().funds);
      }
      if (passDoc.exists()){
        setDataPass(passDoc.data().pass);
      }
    };
    fetchBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== dataPass) {
      alert("password salah")
      return
    }
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
        <label>Kategori:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="income">Pemasukan</option>
          <option value="outcome">Pengeluaran</option>
        </select>
      </div>

      <div>
        <label>Deskripsi:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Tanggal:</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      {/* Include the new AmountControl component */}
      <AmountControl amount={amount} setAmount={setAmount} />

      <p>Uang Kas: {numberWithCommas(funds)}</p>
      <div>
        <label>Password:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
