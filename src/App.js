import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create';
import Allposts from './Pages/Allposts';
import ViewPost from './Pages/ViewPost';
import { FirebaseContext, userContext } from './store/Context';

function App() {
  const {setUser} = useContext(userContext);
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  })
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/create'>
          <CreatePage />
        </Route>
        <Route path='/posts'>
          <Allposts />
        </Route>
        <Route path='/view/:productID'>
          <ViewPost />
        </Route>
      </Router>
    </div>
  );
}

export default App;
