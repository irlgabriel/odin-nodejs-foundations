import './App.css';
import {
  Navbar
} from "./Components";
import {
  Container
} from 'reactstrap';
import {
  Index
} from "./Pages";


function App() {
  return (
    <Container fluid className='p-0'>
      <Index />
    </Container>
  );
}

export default App;
