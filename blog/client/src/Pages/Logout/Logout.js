import { LoadingOverlay } from "../../Components";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = ({setUser}) => {
  const history = useHistory();
  useEffect(() => {
    localStorage.removeItem('user');
    setUser(undefined);
    history.push('/');
  }, [])

  return (
    <LoadingOverlay />
  )
}

export default Logout;