import { useEffect, useState} from 'react';
import { 
  Container,
} from "reactstrap";
import { Comment, LoadingOverlay, LoginPrompt, CommentForm } from "../";
import { CSSTransition } from 'react-transition-group';
import moment from 'moment';
import axios from 'axios';

const Post = ({currentUser, _id, author, title, content, createdAt}) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  // fetch comments
  useEffect(() => {
    setLoading(true);
    axios.get(`/posts/${_id}/comments`)
    .then(res => {
      setComments(res.data);
      setLoading(false);
    })
    .catch(err => console.log(err))
  }, [])
  return(
    <Container className='mb-3 border p-2' style={{borderRadius: '4px'}}>
      {loading && <LoadingOverlay />}
      <span>by {author.email}</span>
      <span>&nbsp; {moment(createdAt).fromNow()}</span>
      <h3>{title}</h3>
      <p>{content}</p>
      <p onClick={() => setDropdown(!dropdown)} style={{userSelect: "none", cursor: "pointer"}} className='pb-0 mb-0'>Comments({comments.length})</p>
      <CSSTransition
        in={dropdown}
        timeout={300}
        classNames='fade'
        unmountOnExit
      >
        <div>
          <hr style={{background: 'white'}} className='mt-1' />
          {!currentUser && <LoginPrompt info={' to post comments!'} />}
          {currentUser && <CommentForm setComments={setComments} comments={comments} currentUser={currentUser} post_id={_id}/>}
          {
            comments.map(comment => <Comment key={comment._id} {...comment} />)
          }
        </div>
      </CSSTransition>
    </Container>
  )
}

export default Post;