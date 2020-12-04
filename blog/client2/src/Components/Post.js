import { 
  Container,
  Button
} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';

const Post = ({_id, author, content, title, createdAt, published, posts, setPosts}) => {

  const togglePublish = () => {
    console.log('asd')
    axios.post(`/posts/${_id}/${published ? 'unpublish' : 'publish'}`)
    .then(res => {
      setPosts(posts.map(post => post._id === _id ? res.data : post))
    })
    .catch(err => console.log(err))

  }

  return (
    <Container className='p-2 border mb-2' style={{borderRadius: '4px'}}>
      <Button className='mr-2' type='button' color={published ? 'danger' : 'success'} onClick={() => togglePublish()}>{published ? 'Unpublish' : 'Publish'}</Button>
      <span>by {author.email}</span>
      <span>&nbsp; {moment(createdAt).fromNow()}</span>
      <h3 className='mb-1'>{title}</h3>
      <p className='mb-1'>{content}</p>
    </Container>
  )
}

export default Post;