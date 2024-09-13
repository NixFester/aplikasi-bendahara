import React, {useState} from "react";
import Form from "./Form";
import '../App.css'
import Listing from './List'
import Pendaftar from "./Pendaftar";

function Tunjukan() {
  const [showForm, setShowForm] = useState(false); // State to toggle Form visibility
  const [categorry,setCategorry] = useState(true);
  const [tempe,setTempe] =useState(false); //pendaftaran sementara

  const handleButtonClick = () => {
    setShowForm(!showForm); // Toggle the form's visibility on button click
  };
  const handleButtonClick2 = () => {
    setCategorry(!categorry); // Toggle the form's visibility on button click
  };
  const handleButtonClick3 = () => {
    setTempe(!tempe); // Toggle the form's visibility on button click
  };

  const Kebendarahaan = (
    <div>
      <h1>Kebendarahaan</h1>
      <div className="buttonfield">
        {/* Button to show/hide Form */}
        <button onClick={handleButtonClick}  style={{ textAlign: 'center', marginTop: '20px' }}>
            {showForm ? 'Tabel' : 'Form'}
        </button>
        <button onClick={handleButtonClick2}  style={{ textAlign: 'center', marginTop: '20px' }}>
            {categorry ? 'Pendapatan' : 'Pengeluaran'}
        </button>
        <button onClick={handleButtonClick3}  style={{ textAlign: 'center', marginTop: '20px' }}>
          {tempe? "Bendahara": "Pendaftaran"}
        </button>
      </div>

      
      {/* Conditionally render Form component */}
      {showForm? <Form />:<Listing collectionName={categorry?"income":"outcome"} />}
    </div>
  )

  const Pendaftaran = (
    <div>
      <button onClick={handleButtonClick3}  style={{ textAlign: 'center', marginTop: '20px' }}>
          {tempe? "Bendahara": "Pendaftaran"}
      </button>
      <Pendaftar/>
    </div>
  )

  return (
    <div>
      
      {tempe?Pendaftaran:Kebendarahaan}
    </div>
  );
}

export default Tunjukan;
