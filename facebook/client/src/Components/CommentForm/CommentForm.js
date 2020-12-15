import Axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  FormGroup,
  Button
} from 'reactstrap';
import {
  UserImage,
  PhotoImage
} from './CommentForm.components';
import { ImageForm } from '..';
import autosize from 'autosize';


const CommentForm = ({post, user, comments, setComments}) => {

  const textArea = useRef(null);
  const [file, setFile] = useState(null);
  const [imageForm, setImageForm] = useState(false);
  const [content, setContent] = useState('');
  const [showSubmit, setSubmit] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content)
    if(file) formData.append('image', file);
    Axios.post(`/posts/${post._id}/comments`, formData, {headers: {Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user')).token}})
    .then(res => {
      setContent('');
      setImageForm(false);
      setFile(null);
      setComments([res.data, ...comments]);
    })
    .catch(err => console.log(err));
  }

  const onChangeHandler = (e) => {
    // Reset field height
    e.target.style.height = 'inherit';

    // Calculate the height
    const height = e.target.scrollHeight


    e.target.style.height = `${height}px`;
}
  useEffect(() => {
    autosize(textArea)
  }, [textArea])
  return (
    <Form onSubmit={(e) => submitHandler(e)}>

      <div className='d-flex align-items-center mb-2'>
        <UserImage className='mr-2' src={user.profile_photo}/>
          <FormGroup className='mb-0 w-100 position-relative'>
            <Input onFocus={() => setSubmit(true)} style={{borderRadius: '16px'}} value={content} className='w-100 py-1 pr-5' placeholder='Write a comment..' type='textarea' rows={1} name='content' onChange={(e) => {setContent(e.target.value); onChangeHandler(e)}}/>
            <PhotoImage onClick={() => setImageForm(!imageForm)} size={24} fill='green'/>
          </FormGroup>
      </div>
      {
        imageForm && 
        <Input onChange={(e) => setFile(e.target.files[0])} type='file' name='image' />
      }      
      {
        showSubmit &&
        <FormGroup className='text-right'>
          <Button type='submit' color='primary' size='sm'>Comment!</Button>
        </FormGroup>
      }
    </Form>

  )
}

export default CommentForm;