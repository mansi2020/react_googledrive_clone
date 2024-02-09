import {useState} from 'react'
import Header from "./../Header/Header";
import Sidebar from "./../Sidebar/Sidebar";
import Data from "./../Data/Data";

const Drivepage = () => {
  // const [fileState,setFileState] = useState(null);

  // const updateFileState = (newFileState)=>{
  //   setFileState(newFileState);
  // }
  return (
    <div>
      <Header />
      <div className="App-container">
        <Sidebar/>
        <Data/>
      </div>
    </div>
  )
}

export default Drivepage
