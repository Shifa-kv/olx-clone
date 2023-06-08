import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, infoPopupContext, userContext } from '../../store/Context';
import Info from '../Popup/Info';

const Create = () => {
  const initialState = {
    Name: '',
    category: '',
    Price: '',
    file: '',
    location:''
  }
  const [sellValue, setSellValue] = useState(initialState);
  const handleChange = (e) => {
    setSellValue({ ...sellValue, [e.target.name]: e.target.value })
  }
  const {user} = useContext(userContext);
  const {setInfo,...info} = useContext(infoPopupContext);

  // sell button submit
  const { firebase } = useContext(FirebaseContext);
  const handleSubmit = () => {
    const db = firebase.firestore();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const currentTime = new Date().toLocaleDateString(undefined, options);
    firebase.storage().ref('images/'+sellValue.file.name).put(sellValue.file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      snapshot.ref.getDownloadURL().then((downloadUrl)=>{
        console.log(downloadUrl);
        db.collection("products").add({
          category: sellValue.category,
          location: sellValue.location,
          createdAt:currentTime,
          name: sellValue.Name,
          price: sellValue.Price,
          url : downloadUrl,
          userId: user.uid
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            var message = 'Product successfully added!'
            setInfo({...info, status:'success', show:true,message:message});
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            setInfo({...info, status:'error', show:true,message:error});
        });


      })
    });
    
  
  }

  return (
    <Fragment>
      <Header />
      {info.show && <Info />}
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            defaultValue="John"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            defaultValue="John"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="fname">Location</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="location"
            defaultValue="banglure"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            onChange={handleChange}
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={sellValue.file ? URL.createObjectURL(sellValue.file) : ''}></img>
          <br />
          <input type="file" onChange={
            (e) => {
              setSellValue({ ...sellValue, file: e.target.files[0] })
            }}
          />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
