import React, {useEffect,useState} from 'react';
import io from 'socket.io-client';

function App() {

  const [socket]= useState(()=> io(':8000'))
  const [msg, setMsg] = useState("");

  const [messages, setMessages] = useState([])

  const doThing = e => {
    e.preventDefault();
    socket.emit("thing", {mss: msg});
    setMsg("")

  }

  useEffect(()=>{
    socket.on("response", data =>{
      setMessages([data, ...messages])
      console.log(data)
    })

  }, [messages])


  return (
    <div>
      <h1>Smol Talk</h1>
      <ul>
        {messages.map((m, i) => 
        <li key={i}>{ m.mss } </li>
        )}
      </ul>  
      <form onSubmit={doThing}>
        <textarea name="" id="" cols="30" rows="10" placeholder="your message..." onChange={e => setMsg(e.target.value)} value= {msg}></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default App;
