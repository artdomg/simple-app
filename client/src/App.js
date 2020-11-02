import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [text, setText] = useState('');
  const [values, setValues] = useState([]);

  const fetchValues = async () => {
    const result = await axios.get(`${apiUrl}/values`);
    setValues(result.data);
  };

  const submitValue = async () => {
    if (!text) return;
    await axios.post(`${apiUrl}/values`, {
      value: text
    });
    await fetchValues();
    setText('');
  }

  useEffect(() => {
    fetchValues();
  }, []);

  return (
    <div className="App">
      <h1>Cliente Docker</h1>

      <input
        type="text"
        placeholder="Escribe algo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={submitValue}>Enviar</button>

      <hr />

      <h2>Valores</h2>
      {values.map(value => (
        <div>{value.val}</div>
      ))}
    </div>
  );
}

export default App;
