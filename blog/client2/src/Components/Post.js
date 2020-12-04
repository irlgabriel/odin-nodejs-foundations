import { useState } from 'react';
import { 
  Container,
  Button,
  Form,
  Label,
  Input,
  FormGroup
} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';

const Post = ({_id, author, content, title, createdAt, published, posts, setPosts}) => {

  const [currentContent, setContent] = useState(content);
  const [currentTitle, setTitle] = useState(title);
  const [showEdit, setShowEdit] = useState(false);

  const togglePublish = () => {
    axios.post(`/posts/${_id}/${published ? 'unpublish' : 'publish'}`)
    .then(res => {
      setPosts(posts.map(post => post._id === _id ? res.data : post))
    })
    .catch(err => console.log(err))

  }

  const edtiHandler = (e) => {
    e.preventDefault();
    axios.put(`posts/${_id}`, {title: currentTitle, content: currentContent})
    .then(res => {
      setPosts(posts.map(post => post._id === res.data._id ? res.data : post))
      setShowEdit(false);
    })
    .catch(err => console.log(err));
  }

  const deleteHandler = () => {
    window.confirm('Are you sure you want to delete this post? This action cannot be undone.') && 
    axios.delete(`/posts/${_id}`)
    .then(res => {
      setPosts(posts.filter(post => post._id !== res.data._id))
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Container className='p-2 border mb-2' style={{borderRadius: '4px'}}>
      <div className='d-flex align-items-center justify-content-around'>
        <Button className='mr-2' type='button' color={published ? 'danger' : 'success'} onClick={() => togglePublish()}>{published ? 'Unpublish' : 'Publish'}</Button>
        <div className='ml-auto'>
          <Button className='mr-2' type='button' onClick={() => setShowEdit(!showEdit)} color='warning'>Edit</Button>
          <Button type='button' onClick={() => deleteHandler()} color='danger'>Delete</Button>
        </div>
      </div>
      <span>by {author.email}</span>
      <span>&nbsp; {moment(createdAt).fromNow()}</span>
      {
        !showEdit &&
      <div>
        <h3 className='mb-1'>{title}</h3>
        <p className='mb-1'>{content}</p>
      </div>
      }
      {
        showEdit && 
        <Form>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input type='text' name='title' onChange={(e) => setTitle(e.target.value)} defaultValue={currentTitle} />
          </FormGroup>
          <FormGroup>
            <Label for='content'>Content</Label>
            <Input type='textarea' rows={10} name='content' onChange={(e) => setContent(e.target.value)} defaultValue={currentContent} />
          </FormGroup>
          <FormGroup className='d-flex align-items-center'>
            <Button className='mr-2' type='button' onClick={() => setShowEdit(false)} color='secondary'>Cancel</Button>
            <Button type='button' onClick={(e) => edtiHandler(e)} color='primary'>Edit</Button>
          </FormGroup>
        </Form>
      }
    </Container>
  )
}

export default Post;