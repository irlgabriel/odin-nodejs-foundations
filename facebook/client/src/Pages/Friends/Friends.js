import { useState, useEffect } from 'react';
import { Navbar } from '../../Components';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import {
  Profile
} from "../../Pages/"
import {
  FriendRequest
} from '../../Components'
import Axios from 'axios';

const Friends = ({user, posts, setPosts}) => {

  const [requests, setRequests] = useState([]);
  const [previewUserPosts, setPreviewUserPosts] = useState([]);
  const [previewUser, setPreviewUser] = useState([]);

  const sendFriendRequest = () => {

  }

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
          <FriendRequest key={user._id} from={user} to={user} />
          <h5>People you may know</h5>
          {
            requests.map(request => 
              <FriendRequest key={request._id} request={request} />
            )
          }
        </Col>
        <Col id='friends-profile' className='p-0'>
          <Profile showNav={false} user={user} posts={posts} setPosts={setPosts} currentUser={user}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Friends;