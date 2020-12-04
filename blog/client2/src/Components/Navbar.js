import { useState } from 'react';
import { Nav } from 'reactstrap';
import { Login } from "../Components";


const Navbar = ({ setUser, currentUser}) => {
  const [showLogin, setShowLogin] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    setUser(undefined);
  }  

  return (
    <Nav className='px-3'>
      {
        showLogin && 
        <Login setUser={setUser} setShowLogin={setShowLogin} />
      }
      <div className='p-2 ml-auto'>
        {
        currentUser ?
        <div className='d-flex align-items-center'>
          <p className='mb-0 mr-2'>Logged in as {currentUser.email}</p>
          <p onClick={() => logoutHandler()} className='nav-link'>Log out</p>
        </div>
        :
        <div className='d-flex align-items-center'>
          <p onClick={() => setShowLogin(!showLogin)} className='mr-2 nav-link'>Login</p>
        </div>
        }
      </div>
    </Nav>
  )
}

export default Navbar;