import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Form,
  Input,
  Label,
  Button,
  FormGroup,
} from 'reactstrap';

const Index = ({user}) => {
  const location = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post('/login', {email, password})
    .then(res => {
      localStorage.setItem('user', JSON.stringify({user: res.data.user, token: res.data.token}));
      location.push('/home');
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if(user) location.push('/home');
  }, [user])

  return (
    <Container id='index-main'>
      <div id='facebook-story'>
        <img id='fb-logo' src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'/>
        <p>Connect with friends and the world around you on Facebook.</p>
      </div>
      <div id='index-login'>
        <Form onSubmit={(e) => submitHandler(e)}>
          <FormGroup>
            <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />
          </FormGroup>
          <FormGroup>
            <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='********' />
          </FormGroup>
          <FormGroup>
            <Button style={{fontSize:'20px'}} color='primary' className='font-weight-bold py-2 w-100'>Log In</Button>
          </FormGroup>
        </Form>
        <hr />
        <Container className='w-75'>
          <Link to='/register'>
            <Button className='w-100 py-2 font-weight-bold' color='success'>Create New Account</Button>
          </Link>
        </Container>
      </div>
    </Container>
  )
}

export default Index