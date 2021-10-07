import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import MessageError from '../components/messageError'

let socket;
const PORT = 'http://localhost:4555';

function Home() {
  const [room, setRoom] = useState('');
  const [redirectPage, setRedirectPage] = useState({ isRedirect: false, roomName: '' });
  const [redirecting, setRedirecting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState('')

  useEffect(() => {
    socket = io(PORT, { transports: ['websocket'] });
  }, [])

  useEffect(() => {
    socket.on('joined_room', (data) => {
      setRedirect(data);
    })
    socket.on('error_message', (data) => {
      setIsError(true);
      setMessageError(data);
    }
    );
  })

  const setRedirect = ({ goRoom, name }) => {
    if (goRoom && !redirecting) {
      setRedirecting(true);
      setTimeout(() => setRedirectPage({ roomName: name, isRedirect: goRoom }), 1000);
    }
  }

  const createRoom = () => {
    socket.emit('create_room', { room });
  }

  const joinRoom = () => {
    setRedirecting(true);
    setTimeout(() => setRedirectPage({ roomName: room, isRedirect: true }), 1000);
  }

  if (redirectPage.isRedirect) return <Redirect to={`/room/${redirectPage.roomName}`} />

  return (
    <div className='App'>
      {
        redirecting
          ? <div>Redirecinando...</div>
          : null
      }
      {
        isError
          ? <MessageError message={messageError} callback={() => {
            setIsError(false)
          }} />
          : null
      }
      <div>
        <input type='text' onChange={(e) => { setRoom(e.target.value) }} placeholder='Sala' />
        <input type='button' disabled={!room} onClick={createRoom} value='Criar Sala' />
        <input type='button' disabled={!room} onClick={joinRoom} value='Entrar em uma Sala' />
      </div>
    </div>
  );
}

export default Home;
