import { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {
  Nav,
  Button,
  Col,
  Input
} from 'reactstrap'
import {
  NavMidItem,
  RoundWrapper,
  CollapsableDiv,
  RoundImage,
  GrayHover,
  LinkGreyHover,
  RoundedUserDiv,
  TopRightUserImg,
  RegularLink
} from './Navbar.components';
/* React Icons */
import { FaFacebook, FaUserFriends, FaFacebookMessenger, FaDoorOpen} from 'react-icons/fa';
import { AiOutlineSearch, AiFillHome, AiFillBell } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { GoTriangleDown } from 'react-icons/go';
import { BsArrowLeft } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';



const Navbar = ({setUser, user}) => {
  const location = useLocation();
  const history = useHistory();
  
  const [showSearch, setShowSearch] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    history.push('/');
  }

  return (
    <Nav className='px-1'>
      <Col sm='3' className='align-items-center d-flex'>
      {!showSearch && <Link to='/home'><FaFacebook className='mr-2' fill='royalblue' size={40} /></Link>}
        {
          !showSearch &&
          <RoundWrapper onClick={() => setShowSearch(true)} >
            <AiOutlineSearch size={20} />
          </RoundWrapper>
        }
        {
          showSearch &&
          <div className='d-flex align-items-center'>
            <RoundWrapper className='mr-2 px-2' onClick={() => setShowSearch(false) }>
              <BsArrowLeft size={16}/>
            </RoundWrapper>
            <Input style={{borderRadius: '21px'}} type='text' className='py-2' placeholder='Search Facebook' />
          </div>
        }
      </Col>


      <Col className='d-flex align-items-center'>
        <NavMidItem to='/home' active={location.pathname === '/home'} className='mid-nav-item'>
          <AiFillHome size={32} fill={location.pathname === '/home' ? 'royalblue' : 'gray'} className='mr-2'/>
        </NavMidItem>
        <NavMidItem to='/friends' active={location.pathname === '/friends'} className='mid-nav-item'>
          <FaUserFriends fill={location.pathname === '/friends' ? 'royalblue' : 'gray'} size={32} />
        </NavMidItem>
      </Col>


      <Col className='d-flex justify-content-end align-items-center'>
        <RegularLink to='/profile'>
          <RoundedUserDiv active={location.pathname === '/profile'} className='mr-1'>
            <TopRightUserImg src={user.profile_photo} className='mr-2' />
            <p className='mb-0'>{user.first_name}</p>
          </RoundedUserDiv>
        </RegularLink>
        <RoundWrapper className='mr-2'>
          <GrAdd size={16} fill='black'/>
        </RoundWrapper>
        <RoundWrapper className='mr-2'>
          <FaFacebookMessenger size={16} fill='black'/>
        </RoundWrapper>
        <RoundWrapper active={notificationDropdown} onClick={() => setNotificationDropdown(!notificationDropdown)} className='mr-2'>
          <AiFillBell style={{transition: 'all .5s ease-in-out', fill: notificationDropdown ? 'royalblue' : 'black'}} size={16} fill='black'/>
        </RoundWrapper>
        <RoundWrapper onClick={() => setUserDropdown(!userDropdown)}>
          <GoTriangleDown  style={{
            transition: '.3s ease-in-out', transform: userDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
            fill: userDropdown ? 'royalblue' : 'black'
          }} size={16} fill='black'
            
          />
        </RoundWrapper>
      </Col>


      {/** Collapsable div for user profile */}
      <CSSTransition
        in={userDropdown}
        timeout={500}
        classNames='slide-from-top'
        unmountOnExit
      >
        <CollapsableDiv>
          <LinkGreyHover to='/profile'>
            <GrayHover>
              <RoundImage src={user.profile_photo} className='mr-2'/>
              <div>
                <p style={{fontSize: '18px'}} className='font-weight-bold mb-0'>{user.first_name + ' ' + user.last_name || user.display_name}</p>
                <p className='text-muted mb-0'>See your profile</p>
              </div>
            </GrayHover>
          </LinkGreyHover>
          <hr />
          <GrayHover onClick={() => logoutHandler()}>
            <RoundWrapper className='mr-2'>
              <FaDoorOpen size={24}/>
            </RoundWrapper>
            <p className='mb-0 font-weight-bold'>Log Out</p>
          </GrayHover>
        </CollapsableDiv>  
      </CSSTransition>
      

      {/** Collapsable div for notifications */ }
      <CSSTransition
        in={notificationDropdown}
        timeout={500}
        classNames='slide-from-top'
        unmountOnExit
      >
        <CollapsableDiv>
          <h3>Notifications</h3>
          <p>New</p>
        </CollapsableDiv>
      </CSSTransition>
    </Nav>
  )
}

export default Navbar;