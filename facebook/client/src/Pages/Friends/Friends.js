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

const Friends = ({user, posts, setUser, setPosts}) => {

  const [requests, setRequests] = useState([]);
  const [previewUserPosts, setPreviewUserPosts] = useState([]);
  const [previewUser, setPreviewUser] = useState(undefined);
  const [users, setUsers] = useState([]);

  const config = {
    headers: {
      Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user')).token
    }
  }

  useEffect(() => {
    // get current user's requests
    Axios.get(`/${user._id}/friend_requests`, config)
    .then(res => {
      setRequests(res.data);
    })
    .catch(err => console.log(err));

    // Get friends recommendations
    Axios.get('/friend_recommendations', config)
    .then(res => {
      setUsers(res.data);
    })
  }, [])

  
  // when previewUser changes we change the posts to match theirs
  useEffect(() => {
    if(previewUser) {
      setPreviewUserPosts(posts.filter(post => post.user._id === previewUser._id));
    }
  }, [previewUser])

  return (
    <Container fluid className='px-0'>
      <Navbar key='friends' setUser={setUser} user={user}/>
      <Row className='p-0 m-0'>
        <Col id='friends-col' className='box-shadow-right p-0 px-2' sm='4' style={{background: 'white'}}>
          <h2>Friends</h2>
          <h5>{requests.length} Friend Requests</h5>
          <hr className='my-1'></hr>
          {/* Friend Requests */}
          {
            requests.map(request => 
              <FriendRequest requests={requests} setRequests={setRequests} setPreviewUser={setPreviewUser} key={request._id} {...request} />
            )
          }
          <h5>People you may know</h5>
          <hr className='my-1'></hr>
          {
            users.map(from => 
              <FriendRequest requests={requests} setRequests={setRequests} isSuggestion setPreviewUser={setPreviewUser} to={user} from={from} />
            )
          }
        </Col>
        <Col id='friends-profile' className='p-0'>
          {
            previewUser &&
            <Profile showNav={false} user={user} posts={previewUserPosts} setPosts={setPreviewUserPosts} currentUser={previewUser}/>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Friends;