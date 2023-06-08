import React, { useEffect,useContext, useState } from 'react';
import {useParams} from 'react-router-dom'

import './View.css';
import { FirebaseContext } from '../../store/Context';

function View() { 
  const { productID } = useParams();
  const {firebase} = useContext(FirebaseContext);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [productUser, setProductUser] = useState([]);
  useEffect(()=>{
    const db = firebase.firestore();
    db.collection('products').doc(productID).get().then((product)=>{
      setCurrentProduct(product.data()) ;
      console.log(product.data())

    })

  },[productID,firebase])

  useEffect(() => {
    const db = firebase.firestore();
    if(currentProduct&&currentProduct.userId){
      db.collection('users').where('id','==',currentProduct.userId).get().then((snapshot)=>{
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setProductUser(doc.data());
          console.log(doc.data())
        });
        
      })
    }
  }, [currentProduct,firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={currentProduct.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {currentProduct.price} </p>
          <span>{currentProduct.name}</span>
          <p>{currentProduct.category}</p>
          <span>{currentProduct.createdAt}</span>
        </div>
        {productUser&&<div className="contactDetails">
          <p>Seller details</p>
          <p>{productUser.user}</p>
          <p>{productUser.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
