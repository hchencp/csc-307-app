// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  // Start with an empty array
  const [characters, setCharacters] = useState([]);

  // NEW: Function to fetch users from the backend
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  // NEW: Use Effect to call fetchUsers when component mounts
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(index) {
    // 1. Get the character we want to delete so we can get their ID
    const characterToDelete = characters[index];
    const id = characterToDelete.id; // The backend needs this ID!

    // 2. Make the DELETE request
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        // 3. If successful (204), update the frontend
        if (res.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
        } else if (res.status === 404) {
          console.log("Resource not found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json(); // Get the data you just saw in the network tab
        } else {
          console.log("Failed to insert user. Status:", res.status);
          return undefined;
        }
      })
      .then((newUser) => {
        if (newUser) {
          setCharacters([...characters, newUser]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

export default MyApp;
