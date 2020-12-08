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