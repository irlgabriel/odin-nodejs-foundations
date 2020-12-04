import { PostPreview } from "../../Components";
import { Container } from "reactstrap";

const Index = ({posts, currentUser}) => {
  return(
    <Container className='d-flex align-items-center flex-wrap justify-content-around'>
      {
        posts.map(post => post.published ? 
          <PostPreview key={post._id} {...post} currentUser={currentUser}/>
          : ''
        )
      }
    </Container>
  )
}

export default Index;