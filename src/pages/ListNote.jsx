import React, { useState, useEffect } from "react";
import { firestore } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function ListNote() {
  // state
  const [notes, setNotes] = useState([]);

  // get notes collection
  const getNotesCollection = async () => {
    let noteArray = [];
    let noteRef = await collection(firestore, "notes");
    let result = await getDocs(noteRef);
    result.forEach((res) => {
      noteArray.push(res.data());
    });
    return noteArray;
  };

  useEffect(() => {
    getNotesCollection()
      .then((res) => {
        // console.log(res);
        setNotes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>List Note</h1>
      {notes.map((e) => (
        <div key={e.id} style={{ margin: "20px 0px" }}>
          <p> {e.text} </p>
          <small> {e.author} </small>
        </div>
      ))}
    </div>
  );
}
