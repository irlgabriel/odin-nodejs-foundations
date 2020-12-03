import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
} from 'reactstrap';

const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/users/sign-up', {email, password})
    .then(res => {
      //console.log(res.data);
      history.push('/users/login')
    })
    .catch(err => console.log(err))
  }

  return(
    <Container>
      <h3 className='text-center'>Sign Up</h3>
      <Form onSubmit={(e) => submitHandler(e)}>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} type='email' name='email' required />
        </FormGroup>
        <FormGroup>
          <Label for='password' required>Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} type='password' name='password' />
        </FormGroup>
        <FormGroup className='text-center'>
          <Button type='submit' color='primary'>Sign Up</Button>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default Signup;