import './App.css';
import {
  Container
} from 'reactstrap';
import {
  Index,
  Home,
  Profile
} from "./Pages";
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Container fluid className='p-0'>
        {/* Page routes */}
        <Route exact path='/' render={() => <Index />}></Route>
        <Route exact path='/home' render={() => <Home />}></Route>
        <Route exact path='/profile' render={() => <Profile />}></Route>
      </Container>
    </Router>
  );
}

export default App;
