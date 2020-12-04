import { useState } from 'react'
import { 
  Container,
  Input,
  Button 
} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
import { 
  SectionFlex,
  Section,
  FooterItem
} from "./Comment.components";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Comment = ({comments, setComments, currentUser, content, _id, author, createdAt, post}) => {
  const [edit, setEdit] = useState(false);
  const [currentContent, setContent] = useState(content);

  const editHandler = (e) => {
    e.preventDefault();
    axios.put(`/posts/${post._id}/comments/${_id}`, {content: currentContent}, {headers:{Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`}})
    .then(res => {
      console.log(res.data);
      setComments(comments.map(comment => comment._id !== _id ? comment : res.data));
      setEdit(false);
    })
  }

  const deleteHandler = () => {
    window.confirm('Are you sure you want to delete this comment? This action cannot be undone.') && 
    axios.delete(`/posts/${post._id}/comments/${_id}`)
    .then(res => {
      setComments(comments.filter(comment => comment._id !== res.data._id));
    })
    .catch(err => console.log(err));
  }

  return (
    <Container fluid className='pl-4'>
      {
        !edit 
        ? 
        <div>
          <span>by </span>
          <span style={{color: author._id === currentUser._id ? 'royalblue' : ''}}>{author.email}</span>
          <span>&nbsp; {moment(createdAt).fromNow()}</span>
          <p>{content}</p>
        </div>
        :
        <div>
          <form onSubmit={(e) => editHandler(e)}>
            <Input type='textarea' rows='5' value={currentContent} name='content' onChange={(e) => setContent(e.target.value)} />
            <SectionFlex className='my-2'>
              <Button className='mr-3' type='button' onClick={() => setEdit(false)} color='danger'>Cancel</Button>
              <Button type='submit' color='primary'>Edit</Button>
            </SectionFlex>
          </form>
        </div>
      }
      {
        currentUser._id === author._id && !edit && 
        <SectionFlex>
          <FooterItem onClick={() => setEdit(!edit)}>
            <AiFillEdit size={24} fill='yellow' />
            <p className='mb-0'>Edit</p>
          </FooterItem>
          <FooterItem onClick={() => deleteHandler}>
            <AiFillDelete size={24} fill='lightcoral' />
            <p className='mb-0'>Delete</p>
          </FooterItem>
        </SectionFlex>
      }
    </Container>
  )
}

export default Comment;