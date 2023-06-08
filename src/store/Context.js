import { createContext,useState } from "react";

export const FirebaseContext = createContext(null)
export const userContext = createContext(null)
export const infoPopupContext = createContext(null)
export const locationContext = createContext(null)
const initialInfo ={
    message:'',
    status:'',
    show:false
}
const InfoPopupProvider = ({children})=>{

    const [info, setInfo] = useState(initialInfo);
    return(
        <infoPopupContext.Provider value={{...info , setInfo}}>
            {children}
        </infoPopupContext.Provider>
    )
}

export default function UserProider ({children}){
   const [user, setUser] = useState(null)
   return(
    <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
   )
}

const LocationProvider = ({children})=>{

    const [loc, setLocation] = useState(null);
    return(
        <locationContext.Provider value={{loc, setLocation}}>
            {children}
        </locationContext.Provider>
    )
}


export {InfoPopupProvider,LocationProvider}