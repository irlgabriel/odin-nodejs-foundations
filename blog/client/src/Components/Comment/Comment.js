import { Container } from 'reactstrap';
import moment from 'moment';

export const Comment = ({content, _id, author, createdAt, post}) => {
  return (
    <Container fluid className='pl-4'>
      <span>by {author.email}</span>
      <span>&nbsp; {moment(createdAt).fromNow()}</span>
      <p>{content}</p>
    </Container>
  )
}