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
  HashRouter as Router,
  Route
} from 'react-router-dom';

function App() {
  
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser);
    if(currentUser) setUser(currentUser.user);
  }, [localStorage])

  return (
    <Router>
      <Container fluid className='p-0'>
        {/* Page routes */}
        <Route exact path='/' render={() => <Index setUser={setUser}/>}></Route>
        <Route exact path='/home' render={() => <Home user={user} />}></Route>
        <Route exact path='/profile' render={() => <Profile />}></Route>
        <Route exact path='/register' render={() => <Register setUser={setUser} />}></Route>
        <Route exact path='/friends' render={() => <Friends user={user}/>}></Route>
      </Container>
    </Router>
  );
}

export default App;
