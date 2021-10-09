import { useEffect, useContext } from 'react';
import MessageError from '../components/messageError';
import ListUsers from '../components/listUsers';
import { UserDataContext } from '../context'
import { HANDLE_USERNAME, SET_ROOM_LIST_USERS, SET_ROOM_NAME, SET_LOGGED, SET_DATA_USER_ROOM } from '../labels/actions';


const Room = (props) => {

  const { stateData, dispatchData, setError, error, socket } = useContext(UserDataContext);
  const { room, username, logged } = stateData;

  const { match: { params: { id: roomId } } } = props;

  useEffect(() => {
    if (roomId !== room.name) {
      dispatchData({ type: SET_ROOM_NAME, value: roomId })
    }
  }, [roomId, room, dispatchData])


  useEffect(() => {
    if (socket) {
      socket.on('new_user', (data) => dispatchData({ type: SET_ROOM_LIST_USERS, value: data }));
      socket.on('logged', ({ users, user }) => {
        dispatchData({ type: SET_LOGGED, value: { users, login: true } })
        dispatchData({ type: SET_DATA_USER_ROOM, value: user })
      });
      socket.on('error_message', (data) => setError({ isError: true, messageError: data }));
    }
  })

  const joinRoom = () => {
    socket.emit('join_room', { room: room.name, username });
  }

  return (
    <div>
      {
        error.isError
          ? <MessageError />
          : null
      }
      <input type="text" onChange={(e) => dispatchData({ type: HANDLE_USERNAME, value: e.target.value })} placeholder="Apelido..." />
      <input type="button" value="Entrar" onClick={joinRoom} />
      {logged ? <ListUsers list={room.listUser} /> : null}
    </div>
  );
}


export default Room;
