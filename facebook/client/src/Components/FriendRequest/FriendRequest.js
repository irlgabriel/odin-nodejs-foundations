import {
  FriendsContainer,
  FriendInfo,
  RoundImage
} from './FriendRequest.components';
import { Button } from 'reactstrap';
import Axios from 'axios';

const FriendRequest = ({suggestions, setSuggestions, users, requests, setRequests, isSuggestion = false, setPreviewUser, to, from, _id}) => {

  const config = {
    headers: {
      Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user')).token
    }
  }

  const clickHandler = (e) => {
    e.stopPropagation();
    setPreviewUser(to);
  }

  const sendRequest = () => {
    Axios.post(`/friend_requests/${to._id}/send`, {}, config)
    .then(res => {
      setSuggestions(suggestions.filter(suggestion => suggestion._id !== res.data.to._id));
    })
  }

  const confirmFriend = () => {
    Axios.post(`/friend_requests/${_id}/accept`, {}, config)
    .then(res => {
      setRequests(requests.filter(request => request._id !== res.data._id))
    })
  }

  const declineFriend = () => {
    Axios.post(`/friend_requests/${_id}/decline`, {}, config)
    .then(res => {
      setRequests(requests.filter(request => request._id !== res.data._id))
    })
  }

  return (
    <FriendsContainer onClick={(e) => clickHandler(e)} dataId={to._id}>
      <RoundImage src={to.profile_photo} />
      <FriendInfo className='w-100'>
        <h4>{to.display_name || to.first_name + ' ' + to.last_name}</h4>
        {
          !isSuggestion ?
          <div className='d-flex w-100 align-items-center'>
            <Button onClick={() => confirmFriend()} color='primary' className='mr-2 w-100'>Confirm</Button>
            <Button onClick={() => declineFriend()} className='w-100' color='secondary'>Delete</Button>
          </div>
          :
          <div>
            <Button onClick={() => sendRequest()} color='primary' className='w-100'>Send Friend Request</Button>
          </div>
        }
        
      </FriendInfo>
    </FriendsContainer>
  )
}
export default FriendRequest;