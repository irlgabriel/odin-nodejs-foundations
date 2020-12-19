import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { Index, Home, Profile, Register, Friends, PostPage, ProtectedRoute } from "./Pages";
import { LoadingOverlay } from "./Components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const config = localStorage.getItem('user') && {
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  }

  const reloadUser = () => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    if(localUser) {
      const user_id = localUser.user;
      Axios.get(`/users/${user_id}`)
      .then(res => {
        setUser(res.data);
      })
    } else {
      setUser(undefined);
    }
  }

  useEffect(() => {
    reloadUser();
  }, [])

  useEffect(() => {
    setLoading(true);
    if(user) {
      Promise.all([
      // Get posts
      Axios.get("/posts").then((res) => {
        setPosts(res.data);
      }),
      // Get users
      Axios.get("/users").then((res) => {
        setUsers(res.data);
      }),
      //  Get Friend Requests of this user
      Axios.get(`/friend_requests/`, config).then(res => {
        setRequests(res.data);
      })
      ]).then((results) => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);


  const props = { user, posts, setPosts, reloadUser };

  return (
    <Router>
      <Container fluid className="p-0">
        {/* Loading overlay */}
        {loading && <LoadingOverlay />}
        {/* Page routes */}
        
        <ProtectedRoute exact path='/home' {...props} component={Home}/>
        <ProtectedRoute
          path="/profile"
          currentUser={user}
          requests={requests}
          setRequests={setRequests}

          {...props}
          component={Profile}
        ></ProtectedRoute>
        <Route
          path="/register"
          render={() => <Register {...props} />}
        ></Route>
        <Route 
          path="/"
          exact
          render={() => <Index {...props} setUser={setUser}/>}
        ></Route>
        <ProtectedRoute
          path="/friends"
          exact
          requests={requests}
          setRequests={setRequests}
          {...props} 
          component={Friends}
        ></ProtectedRoute>
        {/* Individual Post Routes */}
        {posts.map((post) => (
          <ProtectedRoute
            path={`/posts/${post._id}`}
            post={post}
            {...props}
            component={PostPage}
          ></ProtectedRoute>
        ))}
        {/* Individual User Pages */}
        {
        users.map((currentUser) => (
          <ProtectedRoute
            path={`/users/${currentUser._id}`}
            {...props} 
            requests={requests}
            setRequests={setRequests}
            posts={posts.filter(post => post.user._id === currentUser._id)}
            currentUser={currentUser}
            component={Profile}
          ></ProtectedRoute>
        ))}
      </Container>
    </Router>
  );
}

export default App;
