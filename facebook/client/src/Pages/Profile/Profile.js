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
  ProfilePhotoWrapper,
  ProfileSection,
  ProfileHeader,
  ProfileNav,
  NavItem,
  Main,
  DefaultCoverPhoto,
  ChangeProfilePhoto
} from './Profile.components';
import { Post, PostForm, ImageForm } from '../../Components';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import axios from 'axios';
import { FaShower } from 'react-icons/fa';


const Profile = ({posts, setPosts, user, setUser}) => {
  const history = useHistory();

  const [imageForm, setImageForm] = useState(false);

  useEffect(() => {
    if(!user) history.push('/');
  }, [user])

  return (
    <Container fluid className='px-0'>
      {
        imageForm &&
        <ImageForm setImageForm={setImageForm} user={user} setUser={setUser}/>
      }
      <div style={{background: 'white'}}>
        <Navbar user={user} setUser={setUser} />
        <ProfileSection className='px-0'>
          {
            user.cover_photo 
            ? <CoverPhoto src=''></CoverPhoto>
            : <DefaultCoverPhoto></DefaultCoverPhoto>
          }
          <ProfilePhotoWrapper>
            <ProfilePhoto src={user.profile_photo}></ProfilePhoto>
            <ChangeProfilePhoto onClick={() => setImageForm(true)}>
              <AiFillCamera fill='black' size={24}/>
            </ChangeProfilePhoto>
          </ProfilePhotoWrapper>
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