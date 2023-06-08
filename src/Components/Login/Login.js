import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

function Login() {
  const initialState = {
    email:'',
    password:''
  }
  const initialError ={
    isError : false,
    errorMessage : ''
  }

  const [data, setData] = useState(initialState);
  
  const [state, setError] = useState(initialError);

  const {firebase} = useContext(FirebaseContext)

  const history = useHistory()

  const handleLogin = (e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(data.email,data.password).then((result)=>{
      console.log('logged in');
    }).catch((error)=>{
        setError({...state, isError:true , errorMessage:error.message})
    }).then(()=>{
        history.push('/')
    })
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          {state.isError&&
          <div className='showError'>
              {state.errorMessage}
          </div>
          }
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            onChange={(e) => setData({...data,email:e.target.value} )}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            onChange={(e)=> setData({...data,password:e.target.value})}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
