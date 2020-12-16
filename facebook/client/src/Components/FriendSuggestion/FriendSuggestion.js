import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import {
  FriendsContainer,
  FriendInfo,
  RoundImage
} from './FriendSuggestion.components';

const FriendSuggestion = ({setPreviewUser, suggestions, setSuggestions, from, to, _id}) => {

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

  return (
    <FriendsContainer onClick={(e) => clickHandler(e)} dataId={to._id}>
      <RoundImage src={to.profile_photo} />
      <FriendInfo className='w-100'>
        <h4>{to.display_name || to.first_name + ' ' + to.last_name}</h4>
        {
        <div>
          <Button onClick={() => sendRequest()} color='primary' className='w-100'>Send Friend Request</Button>
        </div>
        }
        
      </FriendInfo>
    </FriendsContainer>
  )
}

export default FriendSuggestion;