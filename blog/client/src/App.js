import './App.css';
import axios from "axios";
import { HashRouter as Router, Route, generatePath } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { Navbar, Background, LoadingOverlay, Post } from "./Components";
import { Index, Login, Signup, Logout } from "./Pages";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setUser] = useState(undefined);

  // Fetch resources
  useEffect(() => {
    // check if user is logged-in
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) setUser(user.user);
    // fetch posts
    setLoading(true);
    axios.get('/posts')
    .then(res => {
      setPosts(res.data)
      setLoading(false);
    });
  }, [])

  return (
    <Container className='p-relative' fluid>
      <Router>
        {loading && <LoadingOverlay />}
        <Background />
        <Navbar currentUser={currentUser}/>
        {/* Pages */}
        <Route exact path='/' render={() => <Index currentUser={currentUser} setPosts={setPosts} posts={posts} />}></Route>
        <Route exact path='/login' render={() => <Login setUser={setUser}/>}></Route>
        <Route exact path='/sign-up' render={() => <Signup />}></Route>
        <Route exact path='/logout' render={() => <Logout setUser={setUser}/>}></Route>
        {/* Post routes */}
        {
          posts.map(post => 
            <Route exact path={`/posts/${post._id}`} render={() => <Post {...post} currentUser={currentUser}/>}></Route>
          )
        }
      </Router>
    </Container>
  );
}

export default App;
