import { useEffect } from 'react';

const MessageError = ({ message, callback }) => {
  useEffect(() => {
    setTimeout(() => callback(), 2000);
  }, [callback])
  return (
    <div>{message}</div>
  );
}


export default MessageError;
