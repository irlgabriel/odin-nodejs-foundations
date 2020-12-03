import axios from 'axios';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  Input,
  Container,
  Label,
  Button,
  Form,
  FormGroup
} from 'reactstrap';

const Login = ({setUser}) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/users/login', {email, password})
    .then(res => {
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data.user);
      history.push('/');
    })
  }

  return(
    <Container>
      <h3 className='text-center'>Login</h3>
      <Form onSubmit={(e) => submitHandler(e)}>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} type='email' name='email' required />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} type='password' name='password' required />
        </FormGroup>
        <FormGroup className='text-center'>
          <Button color='primary'>Login</Button>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default Login;