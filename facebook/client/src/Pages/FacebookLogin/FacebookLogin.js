import { useEffect, useState } from 'react';
import axios from 'axios';

const FacebookLogin = () => {

  const [page, setPage] = useState('');

  useEffect(() => {
    axios.get('/auth/facebook', {headers: {'Access-Control-Allow-Origin': '*'}})
    .then(res => console.log(res.data))
  }, [])
  return (
    <>
      {page}
    </>
  )
}

export default FacebookLogin;