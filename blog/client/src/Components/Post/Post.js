import { 
  Container,
} from "reactstrap";
import moment from 'moment';

export const Post = ({_id, author, title, content, createdAt}) => {

  return(
    <Container>
      <span>by {author.email}</span>
      <span>&nbsp; {moment(createdAt).fromNow()}</span>
      <h5>{title}</h5>
      <p>{content}</p>
    </Container>
  )
}