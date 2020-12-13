import {
  FriendsContainer,
  FriendInfo,
  RoundImage
} from './FriendRequest.components';
import { Button } from 'reactstrap';

const FriendRequest = ({to, from}) => {
  return (
    <FriendsContainer dataId={to._id}>
      <RoundImage src={from.profile_photo} />
      <FriendInfo className='w-100'>
        <h4>{from.display_name || from.first_name + ' ' + from.last_name}</h4>
        <div className='d-flex w-100 align-items-center'>
          <Button color='primary' className='mr-2 w-100'>Confirm</Button>
          <Button className='w-100' color='secondary'>Delete</Button>
        </div>
      </FriendInfo>
    </FriendsContainer>
  )
}
export default FriendRequest;