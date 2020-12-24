import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { Index, Home, Profile, Register, Friends, PostPage, ProtectedRoute } from "./Pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(undefined);

  const reloadUser = () => {
    // GET the full user object based on its id;
    if(user) {
      Axios.get(`/users/${user._id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(err))
    } 
  } 

  // Check if user is logged in
  window.addEventListener('storage', () => {
    console.log('storage eventListener popped');
    const token = localStorage.getItem('token');
    if(token) {
      // user is signed up
      const config = {headers: {Authorization: `bearer ${token}`}}
      Axios.get('/isLoggedIn', config)
      .then(res => {
        Axios.get(`/users/${res.data.user_id}`)
        .then(res => setUser(res.data))
      })
    }
  })


  const props = { user, reloadUser };

  return (
    <Router>
      <Container fluid className="p-0">
        {/* Page routes */}
        <ProtectedRoute exact path='/home' {...props} component={Home}/>
        <ProtectedRoute
          path="/profile"
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
          render={() => <Index setUser={setUser} {...props} />}
        ></Route>
        <ProtectedRoute
          path="/friends"
          exact
          {...props} 
          component={Friends}
        ></ProtectedRoute>
        <ProtectedRoute
          path={`/posts/:post_id`}
          {...props}
          component={PostPage}
        ></ProtectedRoute>
        <ProtectedRoute
          path={`/users/:user_id}`}
          {...props} 
          component={Profile}
        ></ProtectedRoute>
      </Container>
      
    </Router>
  );
}

export default App;
