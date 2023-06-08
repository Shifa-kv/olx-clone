import React, { useContext, useEffect,useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext, locationContext } from '../../store/Context';
import {useHistory,Link} from 'react-router-dom'

function Posts() {
  const history = useHistory();
  const{firebase} = useContext(FirebaseContext)
  const{loc} = useContext(locationContext)
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    const db = firebase.firestore();
    const proRef = db.collection("products")
    
    const locQuery = loc?proRef.where("location", "==", loc):proRef;

    locQuery.limit(4).get().then((snapshot)=>{
      const productsData = snapshot.docs.map((product)=>{
        return{
          id:product.id,
        ...product.data()
        }
      })
      setProducts(productsData);
    })
  },[firebase,loc])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <Link to="/posts"><span>View more</span></Link>
        </div>
        <div className="cards">

        {products.map(product=>{
          return <div
            className="card"
            onClick={()=>{
              history.push(`/view/${product.id}`);
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            
        })
        }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map(product=>{
          return <div
            className="card"
            onClick={()=>{
              history.push(`/view/${product.id}`);
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            
        })
        }
        </div>
      </div>
    </div>
  );
}

export default Posts;
