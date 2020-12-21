import { Button } from 'reactstrap';
import axios  from 'axios';
 

const LoginFacebook = () => {
  
  return(
    <div className='text-center mt-2'>
      <a href='http://localhost:5000/auth/facebook'>
        <Button color='primary'>Login with Facebook</Button>
      </a>
    </div>
  );
}

export default LoginFacebook;