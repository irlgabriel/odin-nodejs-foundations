import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const LoginPrompt = ({info}) => {
  return(
    <Container className='d-flex align-items-center p-2 border' style={{borderRadius: "4px"}}>
      <h4>
        <Link to='/login'>Login</Link>
        &nbsp;or&nbsp;
        <Link to='/sign-up'>Sign Up</Link>
        {info}
      </h4>
    </Container>
  )
}

export default LoginPrompt;