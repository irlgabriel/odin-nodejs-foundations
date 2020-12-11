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
import { CSSTransition } from 'react-transition-group';

const PostForm = ({user, setPosts, posts}) => {

  const [showImageForm, setImageForm] = useState(false);
  const [expandForm, setExpandForm] = useState(false);
  const [content, setContent] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.post('/posts', {content}, {headers: {Authorization: 'bearer ' + token}})
    .then(res => {
      setPosts([res.data, ...posts]);
      setContent(false);
    })
    .catch(err => console.log(err));
  }

  const  onChangeHandler = (e) => {
    // Reset field height
    e.target.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + e.target.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
  }

  return (
    <Container fluid className='my-3 p-2' style={{boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)' ,background: 'white', borderRadius: '5px'}}>
      <Form onSubmit={(e) => submitHandler(e)}>
        <div className='d-flex align-items-center mb-2'>
          <RoundImage className='mr-2' src={user.profile_photo} width='36px'/>
          <Input onFocus={() => setExpandForm(true)} value={content} onChange={(e) => {setContent(e.target.value); onChangeHandler(e)}} style={{borderRadius: '24px', background: '#f0f2f5'}} className='border-0' type='textarea' rows='1' placeholder={`What's on your mind, ${user.first_name}?`} />
        </div>
        <CSSTransition
          in={showImageForm}
          timeout={300}
          classNames='fade'
          unmountOnExit
        >   
          <FormGroup style={{marginLeft: '48px'}}>
            <Input type='file' name='image' />
            <em>Max 5MB (Accepted formats: jpg, jpeg, png)</em>
          </FormGroup>
        </CSSTransition>
        
        <CSSTransition
          in={expandForm}
          timeout={300}
          classNames='fade'
          unmountOnExit
        >
          <FormGroup className='py-2'>
            <Button type='submit' className='w-100 px-5' color='secondary'>Post!</Button>
          </FormGroup>
        </CSSTransition>
        <hr className='my-2'/>
        <GrayHover onClick={() => setImageForm(!showImageForm)}>
          <FcStackOfPhotos size={36} className='mr-2'/>
          <p className='m-0'>Photos</p>
        </GrayHover>
      </Form>
    </Container>
    
  )
}

export default PostForm;