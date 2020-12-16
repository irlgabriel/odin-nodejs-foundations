import { useState, useEffect } from "react";
import { Navbar } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { Profile } from "../../Pages/";
import {
  FriendRequest,
  LoadingOverlay,
  FriendSuggestion,
} from "../../Components";
import Axios from "axios";

const Friends = ({sendRequest, confirmFriend, declineFriend, deleteFriend, user, posts, setUser, setPosts }) => {
  const [requests, setRequests] = useState([]);
  const [previewUserPosts, setPreviewUserPosts] = useState([]);
  const [previewUser, setPreviewUser] = useState(undefined);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      Authorization: "bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
  };

  const clickHandler = (e) => {
    //e.stopPropagation();
    const user_id = e.target.getAttribute("data-id");
    Axios.get(`/users/${user_id}`).then((res) => {
      setPreviewUser(res.data);
    });
  };

 

  useEffect(() => {
    setLoading(false);
    // get current user's friend requests
    Promise.all([
      Axios.get(`/friend_requests/`, config).then((res) => {
        setRequests(res.data.filter((request) => request.to._id === user._id));
      }),
      // Get friends recommendations
      Axios.get("/friend_requests/recommendations", config).then((res) => {
        setSuggestions(res.data);
      }),
    ]).then((results) => setLoading(false));
  }, []);

  // when previewUser changes we change the posts to match theirs
  useEffect(() => {
    if (previewUser) {
      setPreviewUserPosts(
        posts.filter((post) => post.user._id === previewUser._id)
      );
    }
  }, [previewUser]);

  return (
    <Container fluid className="px-0">
      {/* Loading overlay */}
      {loading && <LoadingOverlay />}
      <Navbar key="friends" setUser={setUser} user={user} />
      <Row className="p-0 m-0" style={{ height: "auto" }}>
        <Col
          id="friends-col"
          className="d-sm-none d-lg-block box-shadow-right p-0 px-2"
          sm="4"
          style={{ background: "white" }}
        >
          <h2>Friends</h2>
          <h5>{requests.length} Friend Requests</h5>
          <hr className="my-1"></hr>
          {/* Friend Requests */}
          {requests.map((request) => (
            <FriendRequest
              onClick={clickHandler}
              _id={request._id}
              confirmFriend={confirmFriend}
              declineFriend={declineFriend}
              key={request._id}
              from={request.from}
            />
          ))}
          <h5>People you may know</h5>
          <hr className="my-1"></hr>
          {/* Friend Suggestions */}
          {suggestions.map((to) => (
            <FriendSuggestion
              onClick={clickHandler}
              sendRequest={sendRequest}
              key={to._id}
              to={to}
            />
          ))}
        </Col>
        <Col id="friends-profile" className="p-0">
          {previewUser && (
            <Profile
              declineFriend={declineFriend}
              confirmFriend={confirmFriend}
              sendRequest={sendRequest}
              showNav={false}
              user={user}
              posts={previewUserPosts}
              setPosts={setPreviewUserPosts}
              currentUser={previewUser}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Friends;
