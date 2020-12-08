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

const Home = ({user}) => {
<<<<<<< HEAD
  const history = useHistory();
  useEffect(() => {
    if(!user) history.push('/');
  }, [])

  console.log(user);
=======
>>>>>>> d39d09aa16552b08b18c983247af2df2b0b2ad29
  return (
    <Container fluid className='px-0'>
      <Navbar/>
      <Row className='mx-0'>
        <Col id='left-col' className='p-2' sm='3'>
          <NavItem>
            <RoundImage src={user.profile_photo}/>

            &nbsp;{user.displayName || user.first_name + ' ' + user.last_name}
          </NavItem>
          <NavItem>
            <FaUserFriends size={24} fill='royalblue' />
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