import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { Index, Home, Profile, Register, Friends, PostPage, ProtectedRoute, FacebookLogin } from "./Pages";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(undefined);
  const [userID, setUserID] = useState(undefined);

  const reloadUser = () => {
    Axios.get(`/users/${userID}`)
    .then(res => {
      setUser(res.data);
    })
  } 

  // Check if user is logged in
  useEffect(() => {
    Axios.get('/checkAuth')
    .then(res =>
      setUserID(res.data.user_id)
    )
  }, [])

  // When userID changes, load the user based on it.
  useEffect(() => {
    if(userID) {
      reloadUser();
    }
  }, [userID])

  const props = { user, reloadUser };

  return (
    <Router>
      <Container fluid className="p-0">
        {/* Loading overlay */}
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
          render={() => <Index {...props} />}
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
