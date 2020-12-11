import { useState, useEffect } from 'react';
import './App.css';
import {
  Container
} from 'reactstrap';
import {
  Index,
  Home,
  Profile,
  Register,
  Friends
} from "./Pages";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if(currentUser) setUser(currentUser.user);
  }, [localStorage])

  useEffect(() => {
    axios.get('/posts', /*jwt token header,*/)
    .then(res => {
      setPosts(res.data)
    })
  }, [])
  

  const props = {user, setUser, posts, setPosts};

  return (
    <Router>
      <Container fluid className='p-0'>
        {/* Page routes */}
        <Route exact path='/' render={() => <Index {...props}/>}></Route>
        <Route exact path='/home' render={() => <Home {...props} />}></Route>
        <Route exact path='/profile' render={() => <Profile {...props} posts={posts.filter(post => post.user !== user._id)}/>}></Route>
        <Route exact path='/register' render={() => <Register {...props} />}></Route>
        <Route exact path='/friends' render={() => <Friends {...props}/>}></Route>
      </Container>
    </Router>
  );
}

export default App;
