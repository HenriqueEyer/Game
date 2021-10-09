import { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router';
import MessageError from '../components/messageError';
import { UserDataContext } from '../context'
import { SET_ROOM_NAME } from '../labels/actions';

const Home = () => {

  const { stateData, dispatchData, error, setError, socket } = useContext(UserDataContext);
  const { room } = stateData;

  const [redirectPage, setRedirectPage] = useState({ isRedirect: false, roomName: '', redirecting: false });


  useEffect(() => {
    if (socket) {
      socket.on('joined_room', ({ goRoom, name }) => {
        if (goRoom && !redirectPage.redirecting) {
          setRedirectPage({ ...redirectPage, redirecting: true });
          setTimeout(() => setRedirectPage({ roomName: name, isRedirect: goRoom, redirecting: false }), 1000);
        }
      })
      socket.on('error_message', (data) => {
        console.log(data);
        setError({ isError: true, messageError: data })}
        )
    }
  }, [socket, setError, redirectPage])

  const createRoom = () => {
    socket.emit('create_room', { room: room.name });
  }

  const joinRoom = () => {
    setRedirectPage({ ...redirectPage, redirecting: true });
    setTimeout(() => setRedirectPage({ roomName: room.name, isRedirect: true, redirecting: false }), 1000);
  }

  if (redirectPage.isRedirect) return <Redirect to={`/room/${redirectPage.roomName}`} />

  return (
    <div className='App'>
      {
        redirectPage.redirecting
          ? <div>Redirecinando...</div>
          : null
      }
      {
        error.isError
          ? <MessageError />
          : null
      }
      <div>
        <input type='text' onChange={(e) => { dispatchData({ type: SET_ROOM_NAME, value: e.target.value }) }} placeholder='Sala' />
        <input type='button' disabled={!room.name} onClick={createRoom} value='Criar Sala' />
        <input type='button' disabled={!room.name} onClick={joinRoom} value='Entrar em uma Sala' />
      </div>
    </div>
  );
}

export default Home;
