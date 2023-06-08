import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import './Banner.css';
import Arrow from '../../assets/Arrow'
function Banner() {
  
  const{firebase} = useContext(FirebaseContext)
  const [category, setCategory] = useState()
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("products").get().then((snapshot)=>{
      const locData = snapshot.docs.map((doc)=>{
      const data = doc.data();
      const fieldValue = data.category; 
        return fieldValue;
      })
      setCategory(locData);   
    })
  }, [firebase]);
  console.log(category)
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES    |</span>
            {/* <Arrow></Arrow>  */}
          </div>
          <div className="otherQuickOptions">
            {
              category&&category.map(categ=>{
                return <span>{categ}</span>;
              })
            }
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
