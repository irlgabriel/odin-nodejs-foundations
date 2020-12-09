import { Navbar } from '../../Components';
import {
  Container
} from 'reactstrap';

const Friends = ({user}) => {
  return (
    <Container fluid className='px-0'>
      <Navbar user={user}/>

    </Container>
  )
}

export default Friends;