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
  const checkUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if(currentUser) setUser(currentUser.user);
  }
  window.addEventListener('storage', checkUser);
  return () => window.removeEventListener('storage', checkUser);
  }, [])


  return (
    <Router>
      <Container fluid className='p-0'>
        {/* Page routes */}
<<<<<<< HEAD
        <Route exact path='/' render={() => <Index user={user}/>}></Route>
        <Route exact path='/home' render={() => <Home user={user} />}></Route>
        <Route exact path='/profile' render={() => <Profile user={user}/>}></Route>
        <Route exact path='/register' render={() => <Register user={user}/>}></Route>
        <Route exact path='/friends' render={() => <Friends user={user}/>}></Route>
=======
        <Route exact path='/' render={() => <Index setUser={setUser}/>}></Route>
        {user &&  <Route exact path='/home' render={() => <Home user={user} />}></Route>}
        {user && <Route exact path='/profile' render={() => <Profile />}></Route>}
        <Route exact path='/register' render={() => <Register setUser={setUser} />}></Route>
        {user && <Route exact path='/friends' render={() => <Friends user={user}/>}></Route>}
>>>>>>> d39d09aa16552b08b18c983247af2df2b0b2ad29
      </Container>
    </Router>
  );
}

export default App;
