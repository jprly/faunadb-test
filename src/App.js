import './App.css';
import React, { useState } from 'react';


function App() {

//get memories

const [memories, setMemories] = useState()
const getMemories = async () => {
  const resp = await fetch('.netlify/functions/memories')
  const data = await resp.json()
  setMemories(data)
}
const memCard = (m, i) => <div key={i}>{m.data.text}</div>
const renderMemories = memories ? memories.map(memCard) : <button onClick={getMemories}>Show memories</button>

 //save memories
  const [thought, setThought] = useState({ date: new Date().toISOString().split('T')[0], text: '' });
  const saveThought = async () => {
  await fetch('.netlify/functions/post-memory', { method: 'POST', body: JSON.stringify(thought)})
  .then((resp)=>{resp.json()})
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

}
const handleThoughtChange = e => setThought({ ...thought, [e.target.name]: e.target.value})



  return (
    <div className="App">
         <h1>Memories</h1>
    <input type="date" name="date" value={thought.date} onChange={handleThoughtChange}/>
    <input type="text" name="text" placeholder="Your thought" value={thought.text} onChange={handleThoughtChange}/>
    <button onClick={saveThought}>Commit to memory</button>
    <div id="memories">{ renderMemories }</div>

    </div>
  );
}

export default App;
