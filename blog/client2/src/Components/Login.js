import { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Label,
  Button,
  FormGroup,
  Container
} from 'reactstrap'

const Login = ({setUser, setShowLogin}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios.post('/users/login', {email, password})
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data.user);
      setShowLogin(false);
    })
    .catch(err => console.log(err));
  }

  return (
    <Container onClick={() => setShowLogin(false)} fluid className='p-0' style={{display:'flex', justifyContent: 'center', alignItems:'center', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', background: 'rgba(200,0,0,.3'}}>
      <Form className='border p-3 w-50' style={{borderRadius: '4px'}} onClick={(e) => e.stopPropagation()} onSubmit={(e) => submitHandler(e)} style={{background: 'white'}}>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} type='text' name='email' required />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} type='password' name='password' required/>
        </FormGroup>
        <FormGroup>
          <Button color='primary' size='sm'>Login</Button>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default Login;