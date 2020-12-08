import { useState } from 'react';
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
const PostForm = ({user}) => {
  return (
    <Container fluid className='my-3 p-2' style={{background: 'white', borderRadius: '5px'}}>
      <Form>
        <div className='d-flex align-items-center'>
          <RoundImage className='mr-2' src={user.profile_photo} width='36px'/>
          <Input style={{borderRadius: '24px', background: '#f0f2f5'}} className='border-0' type='text' placeholder={`What's on your mind, ${user.first_name}?`} />
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