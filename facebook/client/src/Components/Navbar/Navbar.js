import {
  Nav,
  Button
} from 'reactstrap'

const Navbar = () => {
  return (
    <Nav className='px-3 py-2'>
      <a className='ml-auto' href='/auth/facebook'>
        <Button color='primary' outline='light'>Login with facebook</Button>
      </a>
    </Nav>
  )
}

export default Navbar;