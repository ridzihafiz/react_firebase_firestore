import React from "react";
import { firestore } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function InputNote() {
  // function untuk handle submit
  const handleSubmit = (e) => {
    // stop reloading form
    e.preventDefault();

    // tangkap value dari masing2 field di form
    const text = e.target.text.value;
    const author = e.target.author.value;

    // clear value dari field
    e.target.text.value = "";
    e.target.author.value = "";

    // membuat reference document
    let notesRef = doc(firestore, "notes", Date.now().toString());

    // store data to firestore
    setDoc(notesRef, {
      id: Date.now(),
      author: author,
      text: text,
    })
      .then((res) => {
        console.log("Data successfully stored to Firebase");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <h1>Input Note ke Firebase</h1>
      <form className="noteForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="text">text</label>
          <textarea id="text"></textarea>
        </div>

        <div className="formGroup">
          <label htmlFor="author">author</label>
          <input type="text" id="author" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
