// src/components/AmountControl.js
import React, { useState } from "react";
import { numberWithCommas } from "../fungsi/kumpulanFungsi";

const AmountControl = ({ amount, setAmount }) => {
  const [multiplier, setMultiplier] = useState(1000); // Middle multiplier

  const handleMult = (flag) => {
    const currentMult = flag ? multiplier * 10 : multiplier / 10;
    setMultiplier(currentMult);
  }

  const handlecNum = (value, flag) => {
    const currentNumber = value * multiplier;
    const returnedNumber = flag? currentNumber + amount: amount- currentNumber;
    setAmount(returnedNumber);
  }
  
  const handleManualInput = (e) => {
    setAmount(Number(e.target.value)); // Update amount based on manual input
  };

  return (
    <div className="amount-control">
      <h3>Jumlah Nominal</h3>

      {/* Manual amount input */}
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleManualInput}
          placeholder="Maasukan Jumlah"
        />
      </div>

      {/* Direct amount control */}
      <div>
        <button type="button" onClick={() => handlecNum(1,true)}>+ {numberWithCommas(1 * multiplier)}</button>
        <button type="button" onClick={() => handlecNum(5,true)}>+ {numberWithCommas(5 * multiplier)}</button>
        <button type="button" onClick={() => handlecNum(10,true)}>+ {numberWithCommas(10 * multiplier)}</button>
      </div>
      <div>
        <button type="button" onClick={() => handlecNum(1,false)}>- {numberWithCommas(1 * multiplier)}</button>
        <button type="button" onClick={() => handlecNum(5,false)}>- {numberWithCommas(5 * multiplier)}</button>
        <button type="button" onClick={() => handlecNum(10,false)}>- {numberWithCommas(10 * multiplier)}</button>
      </div>

      {/* Multiplier controls */}
      <div>
        <button type="button" onClick={()=> handleMult(true)}>Kalikan 10</button>
        <span>Dikali : {numberWithCommas(multiplier)}</span>
        <button type="button" onClick={()=> handleMult(false)}>Dibagi 10</button>
      </div>

      <p>Nominal: {numberWithCommas(amount)}</p>
    </div>
  );
};

export default AmountControl;
