import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { Index, Home, Profile, Register, Friends, PostPage } from "./Pages";
import { LoadingOverlay } from "./Components";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [userModified, setUserModified] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [requests, setRequests] = useState([]);

  const config = user && {
    headers: {
      Authorization: "bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
  };

  /* Friend request logic functions */
  const sendRequest = (to) => {
    //const to = e.target.getAttribute('data-id');

    Axios.post(`/friend_requests/${to}/send`, {}, config).then((res) => {
      setSuggestions(
        suggestions.filter((suggestion) => suggestion._id !== res.data.to._id)
      );
    });
  };

  const confirmFriend = (_id) => {
    //const _id = e.target.getAttribute('data-id');
    Axios.post(`/friend_requests/${_id}/accept`).then((res) => {
      setRequests(requests.filter((request) => request._id !== res.data._id));
    });
  };

  const declineFriend = (_id) => {
    //const _id = e.target.getAttribute('data-id');
    Axios.post(`/friend_requests/${_id}/decline`).then((res) => {
      setRequests(requests.filter((request) => request._id !== res.data._id));
    });
  };

  const deleteFriend = (user_id) => {
    Axios.delete(`/friend_requests/${user_id}/delete`, config).then((res) => {
      const newUser = user;
      newUser.friends = newUser.friends.filter(friend => friend._id !== user_id);
      localStorage.setItem('user', JSON.stringify(newUser));
    })
  }

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    if(localUser) {
      const user_id = localUser.user;
      Axios.get(`/users/${user_id}`)
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
    } else {
      setUser(undefined);
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
        {
          !user 
          ? <Route exact path="/" render={() => <Index {...props} />}></Route>
          : <Redirect to='/home' render={() => <Home {...props}/>}/>
        }
        {
          user 
          ? <Route exact path="/home" render={() => <Home {...props} />}></Route>
          : <Redirect to='/' render={() => <Index {...props} />}></Redirect>
        }
        { user
          ? <Route
            exact
            path="/profile"
            render={() => (
              <Profile
                {...props}
                
                currentUser={user}
                posts={posts.filter((post) => post.user !== user._id)}
              />
            )}
          ></Route>
          : <Redirect to='/'  render={() => <Index {...props} />}></Redirect>
        }
        { !user
          ? <Route
            exact
            path="/register"
            render={() => <Register {...props} />}
          ></Route>
          : <Redirect to='/home' render={() => <Home {...props}/>}/>
        }
        {
          user 
          ? <Route
            exact
            path="/friends"
            render={() => 
            <Friends 
              {...props} 
              setSuggestions={setSuggestions}
              suggestions={suggestions}
              setRequests={setRequests}
              requests={setRequests}
              deleteFriend={deleteFriend}
              declineFriend={declineFriend}
              confirmFriend={confirmFriend}
              sendRequest={sendRequest} />}
          ></Route>
          : <Redirect to='/'  render={() => <Index {...props} />}></Redirect>
          }
        {/* Individual Post Routes */}

        {posts.map((post) => (
          user 
          ? <Route
            exact
            path={`/posts/${post._id}`}
            render={() => <PostPage {...props} post={post} />}
          ></Route>
          : <Redirect to='/'  render={() => <Index {...props} />}></Redirect>
        ))}
        {/* Individual User Pages */}
        {users.map((currentUser) => (
          user 
          ? <Route
            exact
            path={`/users/${currentUser._id}`}
            render={() => 
            <Profile 
              {...props} 
              setSuggestions={setSuggestions}
              suggestions={suggestions}
              setRequests={setRequests}
              requests={setRequests}
              deleteFriend={deleteFriend}
              declineFriend={declineFriend}
              confirmFriend={confirmFriend}
              sendRequest={sendRequest}
              currentUser={currentUser} />}
          ></Route>
          : <Redirect to='/'  render={() => <Index {...props} />}></Redirect>
        ))}
      </Container>
    </Router>
  );
}

export default App;
