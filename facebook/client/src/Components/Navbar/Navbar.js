import { Link, useLocation } from 'react-router-dom';
import {
  Nav,
  Button,
  Col,
} from 'reactstrap'
import {
  NavMidItem,
  RoundWrapper
} from './Navbar.components';
/* React Icons */
import { FaFacebook, FaUserFriends, FaFacebookMessenger} from 'react-icons/fa';
import { AiOutlineSearch, AiFillHome, AiFillBell } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <Nav className='px-1'>
      <Col sm='3' className='align-items-center d-flex'>
        <FaFacebook className='mr-2' fill='royalblue' size={40} />          
        <RoundWrapper >
          <AiOutlineSearch size={20} />
        </RoundWrapper>
      </Col>
      <Col className='d-flex align-items-center'>
        <NavMidItem to='/home' active={location.pathname === '/home'} className='mid-nav-item'>
          <AiFillHome size={32} fill='royalblue' className='mr-2'/>
        </NavMidItem>
        <NavMidItem to='/friends' active={location.pathname === '/friends'} className='mid-nav-item'>
          <FaUserFriends fill='royalblue' size={32} />
        </NavMidItem>
      </Col>
      <Col className='d-flex justify-content-end align-items-center'>
        <RoundWrapper className='mr-2'>
          <GrAdd size={16} fill='black'/>
        </RoundWrapper>
        <RoundWrapper className='mr-2'>
          <FaFacebookMessenger size={16} fill='black'/>
        </RoundWrapper>
        <RoundWrapper className='mr-2'>
          <AiFillBell size={16} fill='black'/>
        </RoundWrapper>
        <RoundWrapper>
          <IoIosArrowDown size={16} fill='black'/>
        </RoundWrapper>
      </Col>
    </Nav>
  )
}

export default Navbar;