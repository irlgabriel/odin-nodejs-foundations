import { Container } from "reactstrap";
import { Post, Navbar } from "../../Components";

const PostPage = (props) => {
  return (
    <Container fluid className="m-0 p-0">
      <Navbar key="posts" {...props} />
      <Container className="mt-2">
        <Post {...props} />
      </Container>
    </Container>
  );
};

export default PostPage;
