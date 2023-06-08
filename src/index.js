import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider , { InfoPopupProvider, FirebaseContext,LocationProvider} from './store/Context';
import firebase from './firebase/config';
ReactDOM.render(
<FirebaseContext.Provider value={{firebase}}>
    <UserProvider>
        <InfoPopupProvider>
            <LocationProvider>
                <App />
            </LocationProvider>
        </InfoPopupProvider>
    </UserProvider>
</FirebaseContext.Provider>
, document.getElementById('root')
 );
