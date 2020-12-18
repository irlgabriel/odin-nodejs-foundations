import { Container, Col, Button } from "reactstrap";
import { Navbar } from "../../Components";
import {
  CoverPhoto,
  ProfilePhoto,
  ProfilePhotoWrapper,
  ProfileSection,
  ProfileHeader,
  ProfileNav,
  NavItem,
  Main,
  DefaultCoverPhoto,
  ChangeProfilePhoto,
  GrayHoverDiv,
  FlexDivGray,
  Option,
  CollapseDiv
} from "./Profile.components";
import { Post, PostForm, ImageForm } from "../../Components";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Axios from  'axios';
import { FaShower, FaCheck } from "react-icons/fa";

const Profile = ({
  showNav = true,
  posts,
  setPosts,
  user,
  setUserModified,
  currentUser,
}) => {
  const history = useHistory();

  const [requests, setRequests] = useState([]);
  const [coverPhotoForm, setCoverPhotoForm] = useState(false);
  const [profilePhotoForm, setProfilePhotoForm] = useState(false);
  const [isFriends, setIsFriends] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState(false);
  const [isSameUser, setSameUser] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [getRequests, setGetRequests] = useState(true);

  const config = {
    headers: {
      Authorization: "bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
  };

  /* Friend request logic functions */
  const sendRequest = (to) => {
    //const to = e.target.getAttribute('data-id');
    Axios.post(`/friend_requests/${to}/send`, {}, config).then((res) => {
      
      setGetRequests(true);
    });
  };

  const confirmFriend = (_id) => {
    //const _id = e.target.getAttribute('data-id');
    Axios.post(`/friend_requests/${_id}/accept`).then((res) => {
      setUserModified(true);
      setGetRequests(true);
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
      setUserModified(true);
      setGetRequests(true);
    })
  }


    // get requests
    useEffect(() => {
      // get current user's friend requests
      Promise.all([
        Axios.get(`/friend_requests/`, config).then((res) => {
          setRequests(res.data.filter((request) => request.to._id === user._id));
        }),
      ]).then();
    }, []);
  
  // get friends requests of the logged in user(user) - both sent and received to determine
  // state of friendship. (sent friend request/received/friends/neither)
  useEffect(() => {
    if (currentUser !== user && getRequests) {
      
      console.log(requests);
      const SentRequests = requests
        .filter((request) => request.from._id === user._id)
      console.log(SentRequests);
      const ReceivedRequests = requests
        .filter((request) => request.to._id === user._id)
      console.log(ReceivedRequests);
      setSentRequest(SentRequests.find(request => request.to._id === currentUser._id));
      setReceivedRequest(ReceivedRequests.find(request => request.from._id === currentUser._id));
      setGetRequests(false);
  
      const userFriendsIDs = user.friends.map(friend => friend._id)

      if (userFriendsIDs.includes(currentUser._id)) { 
        setIsFriends(true);
      } else {
        setIsFriends(false);
      }
    } else {
      if (currentUser._id === user._id) setSameUser(true);
    }
  }, [currentUser, getRequests]);



  return (
    <Container fluid className="p-0">
      {profilePhotoForm && (
        <ImageForm
          path={`/${user._id}/profile_photo`}
          setResource={setUserModified}
          setUserModified={true}
          resource={user}
          setImageForm={setProfilePhotoForm}
        />
      )}
      {coverPhotoForm && (
        <ImageForm
          path={`/${user._id}/cover_photo`}
          setResource={setUserModified}
          setUserModified={true}
          resource={user}
          setImageForm={setCoverPhotoForm}
        />
      )}
      <div style={{ background: "white" }}>
        {showNav && <Navbar key="profile" user={user} setUserModified={setUserModified} />}
        <ProfileSection className="px-0">
          {currentUser.cover_photo ? (
            <a href={user.cover_photo}>
              <CoverPhoto src={currentUser.cover_photo}></CoverPhoto>
            </a>
          ) : (
            <DefaultCoverPhoto></DefaultCoverPhoto>
          )}
          {isSameUser && (
            <GrayHoverDiv onClick={() => setCoverPhotoForm(true)}>
              <p className="mb-0">Change Cover Photo</p>
            </GrayHoverDiv>
          )}
          {isFriends && (
            <GrayHoverDiv
              data-id={currentUser._id}
              onClick={() => setCollapse(!collapse)}
            >
              <p className="mb-0">
                <FaCheck /> Friends
              </p>
              {/* Collapsed div for friend options */}
              {collapse && 
                <CollapseDiv>
                  <Option onClick={() => deleteFriend(currentUser._id)}>Remove Friend</Option>
                </CollapseDiv>
              }
            </GrayHoverDiv>
          )}
          {receivedRequest && (
            <FlexDivGray>
              <p className="mb-1">
                {currentUser.display_name ||
                  currentUser.first_name + " " + currentUser.last_name}{" "}
                has sent you a friend request
              </p>
              <div className="d-block">
                <Button onClick={() => confirmFriend(receivedRequest._id)} className="mr-2" color="success">
                  Confirm
                </Button>
                <Button  onClick={() => declineFriend(receivedRequest._id)} color="danger">
                  Delete
                </Button>
              </div>

            </FlexDivGray>
          )}
          {sentRequest && (
            <GrayHoverDiv>
              <p className="mb-0">
                <FaCheck /> Sent Friend Request
              </p>
            </GrayHoverDiv>
          )}
          {!sentRequest && !receivedRequest && !isSameUser && !isFriends && (
            <GrayHoverDiv onClick={() => sendRequest(currentUser._id)}>
              <p className="mb-0">Send Friend Request</p>
            </GrayHoverDiv>
          )}
          <ProfilePhotoWrapper>
            <a href={currentUser.profile_photo}>
              <ProfilePhoto src={currentUser.profile_photo}></ProfilePhoto>
            </a>
            {currentUser._id === user._id && (
              <ChangeProfilePhoto onClick={() => setProfilePhotoForm(true)}>
                <AiFillCamera fill="black" size={24} />
              </ChangeProfilePhoto>
            )}
          </ProfilePhotoWrapper>
        </ProfileSection>
        <h1 className="text-center">
          {currentUser.display_name ||
            currentUser.first_name + " " + currentUser.last_name}
        </h1>
        <ProfileHeader>
          <hr className="my-2" />
          <ProfileNav>
            <NavItem active>Posts</NavItem>
          </ProfileNav>
        </ProfileHeader>
      </div>
      <Main>
        <Col className="d-md-none" sm="5">
          Photos
        </Col>
        <Col className="pt-3">
          {currentUser._id === user._id && (
            <PostForm posts={posts} setPosts={setPosts} user={user} />
          )}
          {posts.map((post) => (
            <Post user={user} posts={posts} post={post} setPosts={setPosts} />
          ))}
        </Col>
      </Main>
    </Container>
  );
};

export default Profile;
