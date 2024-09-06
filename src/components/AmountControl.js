// src/components/AmountControl.js
import React, { useState } from "react";

const AmountControl = ({ amount, setAmount }) => {
  const [multiplier, setMultiplier] = useState(1000); // Middle multiplier

  const handleMult = (flag) => {
    const currentMult = flag ? multiplier * 10 : multiplier / 10;
    setMultiplier(currentMult);
  }

  const handlecNum = (value, flag) => {
    let currentNumber = value * multiplier;
    const returnedNumber = flag?currentNumber + amount: currentNumber - amount;
    setAmount(returnedNumber);
  }
  
  const handleManualInput = (e) => {
    setAmount(Number(e.target.value)); // Update amount based on manual input
  };

  return (
    <div className="amount-control">
      <h3>Adjust Amount</h3>

      {/* Manual amount input */}
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleManualInput}
          placeholder="Enter amount"
        />
      </div>

      {/* Direct amount control */}
      <div>
        <button type="button" onClick={() => handlecNum(1,true)}>+ {1 * multiplier}</button>
        <button type="button" onClick={() => handlecNum(5,true)}>+ {5 * multiplier}</button>
        <button type="button" onClick={() => handlecNum(10,true)}>+ {10 * multiplier}</button>
      </div>
      <div>
        <button type="button" onClick={() => handlecNum(1,false)}>- {1 * multiplier}</button>
        <button type="button" onClick={() => handlecNum(5,false)}>- {5 * multiplier}</button>
        <button type="button" onClick={() => handlecNum(10,false)}>- {10 * multiplier}</button>
      </div>

      {/* Multiplier controls */}
      <div>
        <button type="button" onClick={()=> handleMult(true)}>Increase Multiplier by 10</button>
        <span>Multiplier: {multiplier}</span>
        <button type="button" onClick={()=> handleMult(false)}>Decrease Multiplier by 10</button>
      </div>

      <p>Current Amount: {amount}</p>
    </div>
  );
};

export default AmountControl;
