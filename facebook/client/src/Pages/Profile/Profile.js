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
  ChangeProfilePhoto,
  ChangeCoverPhoto
} from './Profile.components';
import { Post, PostForm, ImageForm } from '../../Components';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import axios from 'axios';
import { FaShower, FaCheck } from 'react-icons/fa';


const Profile = ({showNav = true, posts, setPosts, user, setUser, currentUser}) => {
  const history = useHistory();

  const [coverPhotoForm, setCoverPhotoForm] = useState(false);
  const [profilePhotoForm, setProfilePhotoForm] = useState(false);

  useEffect(() => {
    if(!user) history.push('/');
  }, [user])

  return (
    <Container fluid className='p-0'>
      {
        profilePhotoForm &&
        <ImageForm path={`/${user._id}/profile_photo`} setResource={setUser} resource={user} setImageForm={setProfilePhotoForm}/>
      }
      {
        coverPhotoForm && 
        <ImageForm path={`/${user._id}/cover_photo`} setResource={setUser} resource={user} setImageForm={setCoverPhotoForm} />
      }
      <div style={{background: 'white'}}>
        {showNav && <Navbar user={user} setUser={setUser} />}
        <ProfileSection className='px-0'>
          {
            currentUser.cover_photo 
            ? <a href={user.cover_photo}>
              <CoverPhoto src={currentUser.cover_photo}></CoverPhoto>
              </a>
            : <DefaultCoverPhoto></DefaultCoverPhoto>
          }
          { currentUser._id === user._id ?
            <ChangeCoverPhoto onClick={() => setCoverPhotoForm(true)}>
              <p className='mb-0'>Change Cover Photo</p>
            </ChangeCoverPhoto>
            : !currentUser.friends.includes(user._id) ?
            <ChangeCoverPhoto>
              <p className='mb-0'>Send Friend Request</p>
            </ChangeCoverPhoto>
            :
            <ChangeCoverPhoto>
              <p className='mb-0'><FaCheck /> Friends</p>
              
            </ChangeCoverPhoto>
          }
          
          <ProfilePhotoWrapper>
            <a href={currentUser.profile_photo}>
              <ProfilePhoto src={currentUser.profile_photo}></ProfilePhoto>
            </a>
            { currentUser._id === user._id &&
              <ChangeProfilePhoto onClick={() => setProfilePhotoForm(true)}>
                <AiFillCamera fill='black' size={24}/>
              </ChangeProfilePhoto>
            }
          </ProfilePhotoWrapper>
        </ProfileSection>
        <h1 className='text-center'>{currentUser.display_name || currentUser.first_name + ' ' + currentUser.last_name}</h1>
        <ProfileHeader>
          <hr className='my-2'/>
          <ProfileNav>
            <NavItem active >Posts</NavItem>
          </ProfileNav>
        </ProfileHeader>
      </div>
      <Main>
        <Col className='d-md-none' sm='5'>
          Photos
        </Col>
        <Col className='pt-3'>
        {
          currentUser._id === user._id &&
          <PostForm posts={posts} setPosts={setPosts} user={user}/>
        }
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