import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from "reactstrap";
import { NavItem, RoundImage } from "./Home.components";
import { Navbar, PostForm, Post, LoadingOverlay } from "../../Components";
import { CSSTransition } from 'react-transition-group';
import { FaUserFriends } from "react-icons/fa";

const Home = ({ reloadUser, user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/posts')
    .then(res => {
      setLoading(false);
      setPosts(res.data);
    })
  }, [])

  return (
    <Container fluid className="px-0">
      <CSSTransition
        in={loading}
        timeout={300}
        classNames='fade'
        unmountOnExit
      >
        <LoadingOverlay />
      </CSSTransition>
      <Navbar key="home" posts={posts} reloadUser={reloadUser} setPosts={setPosts} user={user} />
      <Row className="mx-0">
        <Col id="left-col" className="p-2 d-sm-none d-lg-block" sm="3" lg="3">
          <NavItem to="/profile">
            <RoundImage src={user.profile_photo} />
            &nbsp;{user.display_name || user.first_name + " " + user.last_name}
          </NavItem>
          <NavItem to="/friends">
            <FaUserFriends size={36} fill="royalblue" />
            &nbsp;Friends
          </NavItem>
        </Col>
        <Col id="mid-col" sm="12" md="8" lg="6">
          <PostForm posts={posts} setPosts={setPosts} user={user} />
          {posts.map((post) => (
            <Post
              key={post._id}
              user={user}
              setPosts={setPosts}
              posts={posts}
              post={post}
            />
          ))}
        </Col>
        <Col
          id="right-col"
          sm="5"
          md="4"
          lg="3"
          className="d-sm-none d-md-block"
        >
          <h5 style={{ color: "darkgray" }}>Contacts</h5>
          <hr className="my-2" style={{ backgroundColor: "lightgray" }}></hr>
          {user.friends.map((friend) => (
            <NavItem to={`/users/${friend._id}`}>
              <RoundImage src={friend.profile_photo} />
              &nbsp;
              {friend.display_name || friend.first_name + " " + friend.last_name}
            </NavItem>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
