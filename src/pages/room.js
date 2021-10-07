import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import MessageError from '../components/messageError'
import ListUsers from '../components/listUsers'

let socket;
const PORT = 'http://localhost:4555';

const Room = (props) => {
  const [username, setUsername] = useState('');
  const [invalidRoom, setInvalidRoom] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [logged, setLogged] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  const { match: { params: { id } } } = props;

  useEffect(() => {
    socket = io(PORT, { transports: ['websocket'] });
  }, [])

  useEffect(() => {
    socket.on('new_user', (data) => setListUsers(data));
    socket.on('error_message', (data) => {
      setInvalidRoom(true);
      setMessageError(data);
    });
    socket.on('logged', (data) => {
      setListUsers(data.users);
      setLogged(true);
    })
  })

  const joinRoom = () => {
    socket.emit('join_room', { room: id, username });
  }

  return (
    <div>
      {
        invalidRoom
          ? <MessageError message={messageError} callback={() => {
            setInvalidRoom(false)
          }} />
          : null
      }
      <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Apelido..." />
      <input type="button" value="Entrar" onClick={joinRoom} />
      {logged ? <ListUsers list={listUsers} /> : null}
    </div>
  );
}


export default Room;
