import { useState } from 'react';
import { Nav } from 'reactstrap';

const Navbar = ({currentUser}) => {
  return (
    <Nav className='px-3'>
      <div className='p-2 ml-auto'>
        {
        currentUser ?
        <div className='d-flex align-items-center'>
          <p className='mb-0 mr-2'>Logged in as {currentUser.email}</p>
          <p className='nav-link'>Log out</p>
        </div>
        :
        <div className='d-flex align-items-center'>
          <p className='mr-2 nav-link'>Login</p>
          <p className='nav-link'>Sign up</p>
        </div>
        }
      </div>
    </Nav>
  )
}

export default Navbar;