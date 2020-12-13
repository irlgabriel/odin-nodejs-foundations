import { useState, useEffect } from 'react';
import { Navbar } from '../../Components';
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button
} from 'reactstrap';
import {
  FriendsContainer,
  FriendInfo,
  RoundImage
} from './Friends.components';
import {
  Profile
} from "../../Pages/"
import Axios from 'axios';

const Friends = ({user, posts, setPosts}) => {

  const [requests, setRequests] = useState([]);
  const [previewUserPosts, setPreviewUserPosts] = useState([]);
  const [previewUser, setPreviewUser] = useState([]);

  useEffect(() => {
    // get current user's requests
    Axios.get(`/${user._id}/friend_requests`)
    .then(res => {

    })
    .catch(err => console.log(err));

    // show
  }, [])

  return (
    <Container fluid className='px-0'>
      <Navbar user={user}/>
      <Row className='p-0 m-0'>
        <Col id='friends-col' className='box-shadow-right p-0 pl-2' sm='4' style={{background: 'white'}}>
          <h2>Friends</h2>
          <h5>{requests.length} Friend Requests</h5>
          <FriendsContainer>
            <RoundImage src={user.profile_photo} />
            <FriendInfo className='w-100'>
              <h4>{user.display_name || user.first_name + ' ' + user.last_name}</h4>
            <div className='d-flex w-100 align-items-center'>
              <Button color='primary' className='mr-2 w-100'>Confirm</Button>
              <Button className='w-100' color='secondary'>Delete</Button>
            </div>
            </FriendInfo>
          </FriendsContainer>
        </Col>
        <Col id='friends-profile' className='p-0'>
          <Profile showNav={false} user={user} posts={posts} setPosts={setPosts} currentUser={user}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Friends;