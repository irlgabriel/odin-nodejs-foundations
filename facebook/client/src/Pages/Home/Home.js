import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  NavItem,
  RoundImage
} from './Home.components';
import { Navbar, PostForm } from "../../Components";
import { FaUserFriends } from 'react-icons/fa'

const Home = ({setUser, user}) => {
  const history = useHistory();

  useEffect(() => {
    if(!user) history.push('/');
  }, [user])

  return (
    <Container fluid className='px-0'>
      <Navbar setUser={setUser} user={user}/>
      <Row className='mx-0'>
        <Col id='left-col' className='p-2' sm='3'>
          <NavItem>
            <RoundImage src={user.profile_photo}/>

            &nbsp;{user.displayName || user.first_name + ' ' + user.last_name}
          </NavItem>
          <NavItem>
            <FaUserFriends size={36} fill='royalblue' />
            &nbsp;Friends
          </NavItem>
        </Col>
        <Col id='mid-col' sm='6'>
          <PostForm user={user}/>
        </Col>
        <Col id='right-col' sm='3'></Col>
      </Row>
    </Container>
  )
}

export default Home;