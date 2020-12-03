import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';

const CommentForm = ({comments, setComments, currentUser, post_id}) => {
  const [content, setContent] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`/posts/${post_id}/comments`, {content, author: currentUser._id, post: post_id}, {headers:{Authorization: `bearer ${localStorage.getItem('currentUser')}`}})
    .then(res => {
      console.log(res.data);
      setComments([...comments, res.data]);

    })
  }

  return(
    <Container>
      <Form onSubmit={(e) => submitHandler(e)} >
        <FormGroup>
          <Label for='content'>Content</Label>
          <Input placeholder='What are you thinking about..?' onChange={(e) => setContent(e.target.value)} type='textarea' name='content'/>
        </FormGroup>
        <FormGroup>
          <Button color='primary'>Comment</Button>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default CommentForm;
