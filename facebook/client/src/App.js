import { useState, useEffect } from 'react';
import './App.css';
import {
  Container
} from 'reactstrap';
import {
  Index,
  Home,
  Profile,
  Register,
  Friends
} from "./Pages";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if(currentUser) setUser(currentUser.user);
  }, [localStorage])
  
  return (
    <Router>
      <Container fluid className='p-0'>
        {/* Page routes */}
        <Route exact path='/' render={() => <Index user={user} setUser={setUser}/>}></Route>
        <Route exact path='/home' render={() => <Home setUser={setUser} user={user} />}></Route>
        <Route exact path='/profile' render={() => <Profile user={user}/>}></Route>
        <Route exact path='/register' render={() => <Register user={user} setUser={setUser} />}></Route>
        <Route exact path='/friends' render={() => <Friends user={user}/>}></Route>
      </Container>
    </Router>
  );
}

export default App;
