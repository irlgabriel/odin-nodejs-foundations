import { useState } from 'react';
import {
  Form,
  Input
} from 'reactstrap';
import {
  UserImage
} from './CommentForm.components';

const CommentForm = ({user, comments, setComments}) => {

  const [content, setContent] = useState('');

  return (
    <div className='d-flex align-items-center'>
      <UserImage className='mr-2' src={user.profile_photo}/>
      <Form className='w-100'>
        <Input  style={{borderRadius: '16px'}} className='w-100 py-1' placeholder='Write a comment..' type='text' name='content' onChange={(e) => setContent(e.target.value)}/>
      </Form>
    </div>
  )
}

export default CommentForm;