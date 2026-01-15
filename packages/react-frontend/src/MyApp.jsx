// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form"; // 1. Import the Form

function MyApp() {
  // Start with an empty array if you want a clean slate
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => i !== index);
    setCharacters(updated);
  }

  // 2. This function receives a 'person' object from the Form
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      {/* 3. Pass the function down as a prop called 'handleSubmit' */}
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
