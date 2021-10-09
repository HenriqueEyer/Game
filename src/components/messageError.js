import { useEffect, useContext } from 'react';
import { UserDataContext } from '../context'

const MessageError = () => {
  const { error, setError } = useContext(UserDataContext)
  useEffect(() => {
    setTimeout(() => setError({ isError: false, messageError: {} }), 2000);
  }, [error, setError])
  console.log(error)
  return (
    <div>{error.messageError.pt_br}</div>
  );
}


export default MessageError;
