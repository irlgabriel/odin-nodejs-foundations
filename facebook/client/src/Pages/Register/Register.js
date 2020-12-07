import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Form,
  Input,
  Label,
  FormGroup,
  Button,
} from 'reactstrap';

const Register = ({setUser}) => {
  const location = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/register', {email, password, first_name: firstName, last_name: lastName})
    .then(res => {
      setUser(res.data);
      location.push('/');
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Container style={{width: '600px', paddingTop: '60px'}}>
      <h3 className='text-center'>Register</h3>
      <Form onSubmit={(e) => submitHandler(e)}>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input type='email' placeholder='Email..' name='email' onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for='first_name'>First Name</Label>
          <Input type='text' placeholder='First Name..' name='first_name' onChange={(e) => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for='last_name'>Last Name</Label>
          <Input type='text' placeholder='Last Name' name='last_name' onChange={(e) => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input type='password' placeholder='********' name='password' onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for='password_conf'>Password confirmation</Label>
          <Input type='password' placeholder='********' name='password_conf' onChange={(e) => setConfirmPass(e.target.value)} />
        </FormGroup>
        <FormGroup className='text-center'>
          <Button type='submit' color='primary'>Register</Button>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default Register;