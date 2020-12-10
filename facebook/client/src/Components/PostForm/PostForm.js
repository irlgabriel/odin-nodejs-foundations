import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
} from 'reactstrap'
import {
  RoundImage,
  GrayHover,
} from './PostForm.components';
import { 
  FcStackOfPhotos
} from 'react-icons/fc';

const PostForm = ({user, setPosts, posts}) => {

  const [content, setContent] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('user').token);
    axios.post('/posts', {content}, {headers: {Authorization: 'bearer ' + token}})
    .then(res => {
      setPosts([res.data, ...posts]);
    })
    .catch(err => console.log(err));
  }

  return (
    <Container fluid className='my-3 p-2' style={{boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)' ,background: 'white', borderRadius: '5px'}}>
      <Form onSubmit={(e) => submitHandler(e)}>
        <div className='d-flex align-items-center'>
          <RoundImage className='mr-2' src={user.profile_photo} width='36px'/>
          <Input onChange={(e) => setContent(e.target.value)} style={{borderRadius: '24px', background: '#f0f2f5'}} className='border-0 py-2' type='text' placeholder={`What's on your mind, ${user.first_name}?`} />
        </div>
        <hr className='my-3'/>
        <GrayHover>
          <FcStackOfPhotos size={36} className='mr-2'/>
          <p className='m-0'>Photos</p>
        </GrayHover>
      </Form>
    </Container>
    
  )
}

export default PostForm;