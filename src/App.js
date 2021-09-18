import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4555', { transports : ['websocket'] });
socket.on('connection', () => console.log('LOGOU'))

const initialState = {
  username: '',
  login: false,
}

function App() {
  const [user, setUser] = useState(initialState);
  const [number, setNumber] = useState('');

  const logon = () => {
    socket.emit('login', user );
  }

  const username = (e) => {
    setUser({...user, username: e.target.value});
  }

  socket.on('success-login', () => setUser({...user, login:true }));
  socket.on('get-number', (value) => setNumber(value.number));

  useEffect(() => {
    console.log(number)
  },[number])

  useEffect(() => {
    console.log(user)
  },[user])

  return (
    <div className="App">
      <p>Realize seu login:</p>
      <input type="text" onChange={username}/>
      <input type="button" onClick={()=> logon()} value="Login" />
    </div>
  );
}

export default App;
