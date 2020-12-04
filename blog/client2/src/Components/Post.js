import { 
  Container
} from 'reactstrap';
import moment from 'moment';

const Post = ({_id, author, content, title, createdAt, published, posts, setPosts}) => {
  return (
    <Container className='border mb-2' style={{borderRadius: '4px'}}>
      <span>by {author.email}</span>
      <span>&nbsp; {moment(createdAt).fromNow()}</span>
      <h3 className='mb-1'>{title}</h3>
      <p className='mb-1'>{content}</p>
    </Container>
  )
}

export default Post;