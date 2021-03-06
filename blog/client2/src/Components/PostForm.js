import { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  
} from 'reactstrap';

const PostForm = ({posts, setPosts}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    
    axios.post('/posts', {title, content, published}, {headers:{Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`}})
    .then(res => {
      console.log(res.data)
      setPosts([res.data, ...posts]);
    })
    .catch(err => console.log(err));
  }

  return (
    <Form onSubmit={(e) => submitHandler(e)}>
      <FormGroup>
        <Label for='title'>Title</Label>   
        <Input type='text' onChange={(e) => setTitle(e.target.value)} name='title' />
      </FormGroup>
      <FormGroup>
        <Label for='content'>Content</Label>
        <Input type='textarea' rows='10' onChange={(e) => setContent(e.target.value)} name='content' />
      </FormGroup>
      <FormGroup tag='fieldset'>
        <FormGroup check>
          <Label check>
            <Input onChange={(e) => setPublished(e.target.checked)} type='checkbox' name='published'/>
              Published
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Button className='my-2' size='small' type='submit' color='primary'>Create Post</Button>
      </FormGroup>
    </Form>
  )
}

export default PostForm;