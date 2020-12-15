import { useEffect, useState } from 'react';
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
import { Navbar, PostForm, Post } from "../../Components";
import { FaUserFriends } from 'react-icons/fa';

const Home = ({posts, setPosts, setUser, user}) => {
  const history = useHistory();



  useEffect(() => {
    if(!user) history.push('/');
  }, [user])
  
  return (
    <Container fluid className='px-0'>
      <Navbar key='home' setUser={setUser} user={user}/>
      <Row className='mx-0'>
        <Col id='left-col' className='p-2 d-sm-none d-lg-block' sm='3' lg='3'>
          <NavItem to='/profile'>
            <RoundImage src={user.profile_photo}/>

            &nbsp;{user.displayName || user.first_name + ' ' + user.last_name}
          </NavItem>
          <NavItem to='/friends'>
            <FaUserFriends size={36} fill='royalblue' />
            &nbsp;Friends
          </NavItem>
        </Col>
        <Col id='mid-col' sm='12' md='8' lg='6'>
          <PostForm posts={posts} setPosts={setPosts} user={user}/>
          {
            posts.map(post => 
              <Post key={post._id} user={user} setPosts={setPosts} posts={posts} post={post}/>
            )
          }
        </Col>
        <Col id='right-col' sm='5' md='4' lg='3' className='d-sm-none d-md-block'>
          <h5 style={{color: 'darkgray'}}>Contacts</h5>
          <hr className='my-2' style={{backgroundColor: 'lightgray'}}></hr>
          {
            user.friends.map(friend =>
              <NavItem to={`/users/${friend._id}`}>
              <RoundImage src={friend.profile_photo}/>
  
              &nbsp;{friend.displayName || friend.first_name + ' ' + friend.last_name}
            </NavItem>
            )
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Home;