import {
  Container,
  Form,
  Input,
  Label,
  Button,
  FormGroup,
} from 'reactstrap';

const Index = () => {
  return (
    <Container className='d-flex justify-content-around align-items-center' style={{ paddingTop: '90px', width: '980px'}}>
      <div id='facebook-story'>
        <img id='fb-logo' src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'/>
        <h2>Connect with friends and the world around you on Facebook.</h2>
      </div>
      <div id='index-login'>
        <Form>
          <FormGroup>
            <Input type='email' placeholder='Email' />
          </FormGroup>
          <FormGroup>
            <Input type='password' placeholder='********' />
          </FormGroup>
          <FormGroup>
            <Button style={{fontSize:'20px'}} color='primary' className='font-weight-bold py-2 w-100'>Log In</Button>
          </FormGroup>
        </Form>
        <hr />
        <Container className='w-75'>
          <Button className='w-100 py-2 font-weight-bold' color='success'>Create New Account</Button>
        </Container>
      </div>
    </Container>
  )
}

export default Index