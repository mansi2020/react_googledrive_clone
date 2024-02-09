import { createContext, useState,useContext } from "react";

// crete context
const UserContext = createContext();

// useContext for every file
export const useOfContext = ()=>{
    return useContext(UserContext);
}


const ContextProvider = (props)=>{
// state for data
const [searchVal,setSearchVal] = useState();
const [uploadFileStatus,setUploadFileStatus] = useState(false);

// context data
const contextData = {
    searchVal,
    setSearchVal,
    uploadFileStatus,
    setUploadFileStatus
}
    return(
        <>
        <UserContext.Provider value={contextData}>
            {props.children}
        </UserContext.Provider></>
        
    )
}

export default ContextProvider;