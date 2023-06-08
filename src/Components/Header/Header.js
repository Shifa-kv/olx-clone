import React, { useContext, useEffect, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import {Link} from 'react-router-dom'
import { FirebaseContext, locationContext, userContext } from '../../store/Context';

function Header() {

  const {user,setUser} = useContext(userContext);
  const{firebase} = useContext(FirebaseContext)
  const{setLocation} = useContext(locationContext)
  const [AllLoc, setAllLoc] = useState()
  
  const logout = (e)=>{
    firebase.auth().signOut();
    setUser(null);
  }

  const handleLocChange = (e)=>{
    setLocation(e.target.value);
  }
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("products").get().then((snapshot)=>{
      const locData = snapshot.docs.map((doc)=>{
      const data = doc.data();
      const fieldValue = data.location; 
        return fieldValue;
      })
      setAllLoc(locData);   
    })
  }, [firebase]);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/"><OlxLogo></OlxLogo></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <select name='placeSearch' onChange={handleLocChange}>
            <option value=''>All</option>
            {AllLoc&&AllLoc.map((loc)=>{
              return <option value={loc}>{loc}</option>;
            })
            
            }
          </select>

        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user?user.displayName:<Link to='/login'>Login</Link>}
          </span>
          <hr />
          {user&&
          <div className='profilepopup'>
            <ul>
              <li>Edit profile</li>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
          }
        </div>
        <Link to="/create">
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
