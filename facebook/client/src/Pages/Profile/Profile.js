import {
  Container
} from 'reactstrap';
import { 
  Navbar
} from '../../Components';


const Profile = ({user, setUser}) => {
  return (
    <Container fluid className='px-0'>
      <Navbar user={user} setUser={setUser} />
      
    </Container>
  )
}

export default Profile;