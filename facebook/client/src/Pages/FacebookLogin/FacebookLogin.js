import { Button } from 'reactstrap';
import axios  from 'axios';
 

const LoginFacebook = ({user, setUser}) => {

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

  const responseFacebook = () => {
    axios.get('/auth/facebook/callback', config)
    .then(res => console.log(res));
  }

  const componentClicked = () => {
    console.log('Facebook btn clicked');
  }
  
  return(
    <div className='text-center mt-2'>
      <Button onClick={() => responseFacebook()} color='primary'>Login with Facebook</Button>
    </div>
  );
}

export default LoginFacebook;