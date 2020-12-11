import {
  Container,
  Col
} from 'reactstrap';
import { 
  Navbar
} from '../../Components';
import {
  CoverPhoto,
  ProfilePhoto,
  ProfileSection,
  ProfileHeader,
  ProfileNav,
  NavItem,
  Main
} from './Profile.components';
import { Post, PostForm } from '../../Components';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Profile = ({posts, setPosts, user, setUser}) => {
  const history = useHistory();

  useEffect(() => {
    if(!user) history.push('/');
  }, [user])

  return (
    <Container fluid className='px-0'>
      <div style={{background: 'white'}}>
        <Navbar user={user} setUser={setUser} />
        <ProfileSection className='px-0 border'>
          <CoverPhoto src=''/>
          <ProfilePhoto src=''/>
        </ProfileSection>
        <h1 className='text-center'>{user.display_name || user.first_name + ' ' + user.last_name}</h1>
        <ProfileHeader>
          <hr className='my-2'/>
          <ProfileNav>
            <NavItem active >Posts</NavItem>
          </ProfileNav>
        </ProfileHeader>
      </div>
      <Main>
        <Col sm='5'>
          Photos
        </Col>
        <Col>
          <PostForm posts={posts} setPosts={setPosts} user={user}/>
          {
            posts.map(post => 
              <Post user={user} posts={posts} post={post} setPosts={setPosts}/>  
            )
          }
        </Col>
      </Main>
    </Container>
  )
}

export default Profile;