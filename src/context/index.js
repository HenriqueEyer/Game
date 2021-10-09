import io from 'socket.io-client';
import React, { createContext, useReducer, useState, useEffect } from 'react';
import { SET_DATA_USER_ROOM, SET_LOGGED, HANDLE_USERNAME, SET_ROOM_NAME, SET_ROOM_LIST_USERS } from '../labels/actions';

let socket;
const PORT = 'http://localhost:4555';

const initialState = {
  username: '',
  logged: false,
  room: {
    name: '',
    listUser: [],
    yourData: {}
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_USERNAME:
      return { ...state, username: action.value };
    case SET_ROOM_NAME:
      return { ...state, room: { ...state.room, name: action.value } };
    case SET_DATA_USER_ROOM:
      return { ...state, room: { ...state.room, yourData: action.value } };
    case SET_ROOM_LIST_USERS:
      return { ...state, room: { ...state.room, listUser: action.value } };
    case SET_LOGGED:
      const { login, users } = action.value
      return { ...state, room: { listUser: users }, logged: login };
    default:
      throw new Error();
  }
}


const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [stateData, dispatchData] = useReducer(reducer, initialState)
  const [error, setError] = useState({
    isError: false,
    messageError: {}
  })

  useEffect(() => {
    socket = io(PORT, { transports: ['websocket'] });
  }, [])

  const context = {
    stateData,
    dispatchData,
    error,
    setError,
    socket
  };

  console.log(stateData)

  return (
    <UserDataContext.Provider value={context}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider as Provider };