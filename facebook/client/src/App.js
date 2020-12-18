import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { Index, Home, Profile, Register, Friends, PostPage, ProtectedRoute } from "./Pages";
import { LoadingOverlay } from "./Components";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [userModified, setUserModified] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const config = localStorage.getItem('user') && {
    headers: {
      Authorization: "bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
  };

  
  useEffect(() => {
    if(userModified) {
      console.log('APP rendered');
      const localUser = JSON.parse(localStorage.getItem('user'))
      if(localUser) {
        const user_id = localUser.user;
        Axios.get(`/users/${user_id}`)
        .then(res => {
          console.log(res.data);
          setUser(res.data);
          setUserModified(false);
        })
      } else {
        setUser(undefined);
        setUserModified(false);
      }
    } 
  }, [userModified]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      // Get posts
      Axios.get("/posts").then((res) => {
        setPosts(res.data);
      }),
      // Get users
      Axios.get("/users").then((res) => {
        setUsers(res.data);
      }),
    ]).then((results) => setLoading(false));
  }, []);

  const props = { user, posts, setPosts, setUserModified };

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
