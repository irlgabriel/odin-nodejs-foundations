import { useEffect, useState} from 'react';
import { 
  Container,
} from "reactstrap";
import { Comment } from "../Comment/Comment";
import moment from 'moment';
import axios from 'axios';

export const Post = ({_id, author, title, content, createdAt}) => {

  const [comments, setComments] = useState([]);

  // fetch comments
  useEffect(() => {
    axios.get(`/posts/${_id}/comments`)
    .then(res => {
      setComments(res.data);
    })
    .catch(err => console.log(err))
  }, [])
  return(
    <Container>
      <span>by {author.email}</span>
      <span>&nbsp; {moment(createdAt).fromNow()}</span>
      <h5>{title}</h5>
      <p>{content}</p>
      {
        comments.map(comment => <Comment {...comment} />)
      }
    </Container>
  )
}