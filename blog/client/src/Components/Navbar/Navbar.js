import { Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navbar = ({currentUser}) => {
 return (
  <Nav style={{height: '50px'}} className='px-4 justify-content-between align-items-center'>
    <Link className="pb-0" to='/'>
      <h3 className="pb-0">Home</h3>
    </Link>
      {!currentUser && 
        <div className='d-flex align-items-center'>
          <Link className='pb-0' to='/login'>
            <h3 className='pb-0'>Login</h3>
          </Link>
          <Link className='pb-0 ml-2' to='/sign-up'>
            <h3 className='pb-0'>Sign Up</h3>
          </Link>
        </div>
      }
      {currentUser &&
        <Link to='/logout'>
          <h3 className='pb-0'>Logout</h3>
        </Link>
      }
  </Nav>
 )
}
export default Navbar;