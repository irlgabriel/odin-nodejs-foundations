import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { Post } from "./Components/Post/Post";
function App() {
  const [posts, setPosts] = useState([]);
  // Fetch resources
  useEffect(() => {
    // fetch posts
    axios.get('/posts')
    .then(res => setPosts(res.data));
  }, [])
  return (
    <Container fluid>
    {
      posts.map(post => 
        <Post {...post}/>
      )
    }
    </Container>
  );
}

export default App;
