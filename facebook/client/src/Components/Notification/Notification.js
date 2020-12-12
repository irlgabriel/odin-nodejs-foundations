import {
  NotificationContainer,
  UserImage
} from './Notification.components';
import axios from 'axios';

const Notification = ({notification, notifications, setNotifications}) => {

  const clickHandler = () => {
    axios.put(`/notifications/${notification._id}`)
    .then(res => {
      setNotifications(notifications.map(notification => notification._id === res.data._id ? res.data._id : notifications));
    })
  }

  const deleteHandler = () => {
    axios.delete(`/notifications/${notification._id}`)
    .then(res => {
      setNotifications(notifications.filter(notification => notification._id !== res.data._id));
    })
  }

  return (
    <NotificationContainer onClick={() => clickHandler()} clicked={notification.clicked}>
      <UserImage src/>
      <p className='mb-0'>{notification.message}</p>
    </NotificationContainer>
  )
}

export default Notification;