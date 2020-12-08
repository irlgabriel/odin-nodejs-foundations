import { 
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Navbar } from "../../Components";

const Home = () => {
  return (
    <Container fluid className='px-0'>
      <Navbar/>
      <Row>
        <Col id='left-col' sm='3'></Col>
        <Col id='mid-col' sm='5'></Col>
        <Col id='right-col' sm='3'></Col>
      </Row>
    </Container>
  )
}

export default Home;