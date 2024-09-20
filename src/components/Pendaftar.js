// App.js
import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc,deleteDoc, doc,updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Pendaftar() {
  const [showForm, setShowForm] = useState(false);
  const [pendaftar, setPendaftar] = useState([]);
  const [newPendaftar, setNewPendaftar] = useState({
    nama: "",
    programStudi: "",
    semester: 0,
    noHpWa: ""
  });
  const [editableRow, setEditableRow] = useState(null); // Track editable row
  const namaInputRef = useRef(null); // Ref for "nama" input field
  

  // Fetch data from Firebase
  useEffect(() => {
    const pendaftarCollection = collection(db, "Pendaftar");
    

    const fetchData = async () => {
      const pendaftarSnapshot = await getDocs(pendaftarCollection);
      const pendaftarList = pendaftarSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendaftar(pendaftarList);
    };

    const removeDuplicates = async () => {
        try {
            const snapshot = await getDocs(pendaftarCollection);
            const uniqueData = {};
            const batch = [];snapshot.forEach(docSnapshot => {
                const data = docSnapshot.data();
                
                // Use a unique field (e.g., 'id') to check for duplicates
                if (!uniqueData[data.noHpWa]) {
                  uniqueData[data.noHpWa] = docSnapshot.noHpWa;  // Store document id if unique
                } else {
                  // Duplicate found, prepare to delete it
                  batch.push(deleteDoc(doc(db, "Pendaftar", docSnapshot.noHpWa)));
                  console.log(`Duplicate document with ID ${docSnapshot.noHpWa} found, preparing for deletion.`);
                }
              });
          
              // Execute all delete operations
              await Promise.all(batch);
              console.log('Duplicate removal completed.');
            } 
        catch (error) {
            console.error('Error fetching or deleting documents:', error);
        }
    }

    fetchData();
    removeDuplicates();
  }, []);

  // Add new data to Firebase
  const addPendaftar = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Pendaftar"), newPendaftar);
      setPendaftar([...pendaftar, newPendaftar]);
      setNewPendaftar({
        nama: "",
        programStudi: "",
        semester: 0,
        noHpWa: "",
        npm:""
      });
      namaInputRef.current.focus(); // Set focus back to "nama" input
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

// Update data in Firebase
  const updatePendaftar = async (id, updatedPendaftar) => {
    const pendaftarDoc = doc(db, "Pendaftar", id);
    try {
      await updateDoc(pendaftarDoc, updatedPendaftar);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Handle editing the row
  const handleEdit = (index) => {
    if (editableRow === index) {
      // Save changes when the button is pressed again
      const pendaftarToUpdate = pendaftar[index];
      updatePendaftar(pendaftarToUpdate.id, pendaftarToUpdate);
      setEditableRow(null);
    } else {
      // Enable editing when the "Modify" button is first pressed
      setEditableRow(index);
    }
  };

  return (
    <div>
      <h1>Pendaftar</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Show Form"}
      </button>

      {showForm && (
        <form onSubmit={addPendaftar}>
          <input
            ref={namaInputRef} // Focus will return here after submit
            type="text"
            placeholder="Nama"
            value={newPendaftar.nama}
            onChange={(e) => setNewPendaftar({ ...newPendaftar, nama: e.target.value })}
          />
          <input
            type="text"
            placeholder="Program Studi"
            value={newPendaftar.programStudi}
            onChange={(e) => setNewPendaftar({ ...newPendaftar, programStudi: e.target.value })}
          />
          <input
            type="number"
            placeholder="Semester"
            value={newPendaftar.semester}
            onChange={(e) => setNewPendaftar({ ...newPendaftar, semester: e.target.value })}
          />
          <input
            type="text"
            placeholder="No. HP/WA"
            value={newPendaftar.noHpWa}
            onChange={(e) => setNewPendaftar({ ...newPendaftar, noHpWa: e.target.value })}
          />
          <input
            type="text"
            placeholder="NPM"
            value={newPendaftar.npm}
            onChange={(e) => setNewPendaftar({ ...newPendaftar, npm: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Program Studi</th>
            <th>Semester</th>
            <th>No. HP/WA</th>
            <th>NPM</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {pendaftar.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editableRow === index ? (
                  <input
                    type="text"
                    value={p.nama}
                    onChange={(e) =>
                      setPendaftar((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, nama: e.target.value } : item
                        )
                      )
                    }
                  />
                ) : (
                  p.nama
                )}
              </td>
              <td>
                {editableRow === index ? (
                  <input
                    type="text"
                    value={p.programStudi}
                    onChange={(e) =>
                      setPendaftar((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, programStudi: e.target.value } : item
                        )
                      )
                    }
                  />
                ) : (
                  p.programStudi
                )}
              </td>
              <td>
                {editableRow === index ? (
                  <input
                    type="text"
                    value={p.semester}
                    onChange={(e) =>
                      setPendaftar((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, semester: e.target.value } : item
                        )
                      )
                    }
                  />
                ) : (
                  p.semester
                )}
              </td>
              <td>
                {editableRow === index ? (
                  <input
                    type="text"
                    value={p.noHpWa}
                    onChange={(e) =>
                      setPendaftar((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, noHpWa: e.target.value } : item
                        )
                      )
                    }
                  />
                ) : (
                  p.noHpWa
                )}
              </td>
              <td>
                {editableRow === index ? (
                  <input
                    type="text"
                    value={p.npm}
                    onChange={(e) =>
                      setPendaftar((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, npm: e.target.value } : item
                        )
                      )
                    }
                  />
                ) : (
                  p.npm
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(index)}>
                  {editableRow === index ? "Save" : "Modify"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pendaftar;
