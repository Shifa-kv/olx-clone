import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'


export default function Signup() {
  const history = useHistory();
  const initialvalue = {
    name:'',
    email:'',
    phone:'',
    password:''
  }
  const [values, setValue] = useState(initialvalue)
  // set field values on change 
  const handleChange = (e)=>{
      setValue({...values, [e.target.name] : e.target.value})
  }
  // on submit
  const{firebase} = useContext(FirebaseContext) 
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then((result) => {
      console.log(result);
      result.user.updateProfile({ displayName: values.name }).then(() => {
        const db = firebase.firestore();
        db.collection("users").add({
          id: result.user.uid,
          user: values.name,
          phone: values.phone,
        }).then(()=>{
          history.push('/login')
        })
      })
    })
  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={values.name}
            onChange={handleChange}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
