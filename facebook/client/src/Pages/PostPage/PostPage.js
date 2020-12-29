import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from "reactstrap";
import { Post, Navbar } from "../../Components";
import axios from 'axios';

const PostPage = (props) => {
  
  const { post_id } = useParams();

  console.log(post_id)

  const [post, setPost] = useState(undefined)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // GET All posts
    axios.get('/posts')
    .then(res => {
      setPosts(res.data)
    })
    // GET This post
    axios.get('/posts/' + post_id)
    .then(res => {
      setPost(res.data);
    })
  }, [])

  return (
    <Container fluid className="m-0 p-0">
      <Navbar key="posts" {...props} />
      <Container className="mt-2">
        <Post {...props} post={post} posts={posts} setPosts={setPosts} />
      </Container>
    </Container>
  );
};

export default PostPage;
