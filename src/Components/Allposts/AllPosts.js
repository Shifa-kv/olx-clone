import { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import { Link,useHistory } from "react-router-dom";
import { FirebaseContext,locationContext } from "../../store/Context";
import '../Allposts/AllPosts.css'

const AllPosts = () => {
    
    const history = useHistory();
    const{firebase} = useContext(FirebaseContext)
    const{loc} = useContext(locationContext)
    const [products, setProducts] = useState([]);
    useEffect(()=>{
      const db = firebase.firestore();
      const proRef = db.collection("products")
      
      const locQuery = loc?proRef.where("location", "==", loc):proRef;
  
      locQuery.get().then((snapshot)=>{
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
        <div>
            <div className="allPost-page pt-5 pb-5">
                <div className="heading pt-5 mb-5">
                    <span>AllPosts</span>
                </div>
                <div className="cards">

                    {products.map(product => {
                        return <div
                            className="card"
                            onClick={() => {
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
    )
}
export default AllPosts