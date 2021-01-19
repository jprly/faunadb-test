import './App.css';
import React, { useState } from 'react';


function App() {

  const [thought, setThought] = useState({ date: new Date().toISOString().split('T')[0], text: '' });
const saveThought = () => console.log("Commiting thought to memory…")
const handleThoughtChange = e => setThought({ ...thought, [e.target.name]: e.target.value})

fetch('/functions/post-memory/post-memory.js', {
  method: 'POST',
  body: JSON.stringify(thought)
})

  return (
    <div className="App">
         <h1>Memories</h1>
    <input type="date" name="date" value={thought.date} onChange={handleThoughtChange}/>
    <input type="text" name="text" placeholder="Your thought" value={thought.text} onChange={handleThoughtChange}/>
    <button onClick={saveThought}>Commit to memory</button>
    </div>
  );
}

export default App;
