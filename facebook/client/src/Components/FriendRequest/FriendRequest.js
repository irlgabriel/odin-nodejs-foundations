import {
  FriendsContainer,
  FriendInfo,
  RoundImage
} from './FriendRequest.components';
import { Button } from 'reactstrap';
import Axios from 'axios';

const FriendRequest = ({requests, setRequests, isSuggestion = false, setPreviewUser, to, from, _id}) => {

  const config = {
    headers: {
      Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user')).token
    }
  }

  const clickHandler = (e) => {
    e.stopPropagation();
    setPreviewUser(from);
  }

  const sendRequest = () => {
    Axios.post(`/send_friend_request/${to._id}`, {}, config)
    .then(res => {
      setRequests([...requests, res.data]);
    })
  }

  const confirmFriend = () => {
    Axios.post(`/accept_friend_request/${_id}`, {}, config)
    .then(res => {
      setRequests(requests.filter(request => request._id !== res.data._id))
    })
  }

  const declineFriend = () => {
    Axios.post(`/decline_friend_request/${_id}`, {}, config)
    .then(res => {
      setRequests(requests.filter(request => request._id !== res.data._id))
    })
  }

  return (
    <FriendsContainer onClick={(e) => clickHandler(e)} dataId={to._id}>
      <RoundImage src={from.profile_photo} />
      <FriendInfo className='w-100'>
        <h4>{from.display_name || from.first_name + ' ' + from.last_name}</h4>
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