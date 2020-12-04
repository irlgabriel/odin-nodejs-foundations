import './App.css';
import { useState, useEffect } from 'react';
import {
  Container,
  Button
} from 'reactstrap';
import { Post, PostForm, Navbar } from './Components';
import { AiFillPlusCircle } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

function App() {
  const [currentUser, setUser] = useState(undefined)
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // fetch resources
  useEffect(() => {
    // check if there's an user logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) setUser(user.user);

    axios.get('/posts')
    .then(res => {
      setPosts(res.data);
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <Container className='p-0' fluid>
      <Navbar currentUser={currentUser}/>
      <Container>
        <Button onClick={() => setShowForm(!showForm)} type='button' className='my-2 d-block' color='secondary'><AiFillPlusCircle />&nbsp;New Post</Button>
        <CSSTransition
          in={showForm}
          timeout={500}
          unmountOnExit
          classNames='fade'
        >
          <PostForm posts={posts} setPosts={setPosts} />
        </CSSTransition>
      {
        posts.map(post => 
          <Post posts={posts} setPosts={setPosts} {...post}/>
        )
      }
      </Container>
    </Container>
  );
}

export default App;
