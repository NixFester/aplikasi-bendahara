import React, {useState} from "react";
import Form from "./Form";
import '../App.css'
import Listing from './List'

function Tunjukan() {
  const [showForm, setShowForm] = useState(false); // State to toggle Form visibility
  const [categorry,setCategorry] = useState(true);

  const handleButtonClick = () => {
    setShowForm(!showForm); // Toggle the form's visibility on button click
  };
  const handleButtonClick2 = () => {
    setCategorry(!categorry); // Toggle the form's visibility on button click
  };
  return (
    <div>
      <h1>Kebendarahaan</h1>
      <div className="buttonfield">
        {/* Button to show/hide Form */}
        <button onClick={handleButtonClick}  style={{ textAlign: 'center', marginTop: '20px' }}>
            {showForm ? 'Tabel' : 'Form'}
        </button>
        <button onClick={handleButtonClick2}  style={{ textAlign: 'center', marginTop: '20px' }}>
            {showForm ? 'Pendapatan' : 'Pengeluaran'}
        </button>
      </div>

      
      {/* Conditionally render Form component */}
      {showForm? <Form />:<Listing collectionName={categorry?"income":"outcome"} />}
    </div>
  );
}

export default Tunjukan;
