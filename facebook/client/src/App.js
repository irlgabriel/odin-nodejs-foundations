import { useState, useEffect } from 'react';
import './App.css';
import {
  Container
} from 'reactstrap';
import {
  Index,
  Home,
  Profile,
  Register
} from "./Pages";
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

function App() {
  
  const [user, setUser] = useState(undefined);

  return (
    <Router>
      <Container fluid className='p-0'>
        {/* Page routes */}
        <Route exact path='/' render={() => <Index setUser={setUser}/>}></Route>
        <Route exact path='/home' render={() => <Home />}></Route>
        <Route exact path='/profile' render={() => <Profile />}></Route>
        <Route exact path='/register' render={() => <Register setUser={setUser} />}></Route>
      </Container>
    </Router>
  );
}

export default App;
