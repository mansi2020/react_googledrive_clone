import { useEffect, useState,useRef } from "react";
import "./Sidebar.css";
import MobileScreenShareOutlinedIcon from "@mui/icons-material/MobileScreenShareOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import AddIcon from "@mui/icons-material/Add";

// modal functionality-----------
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// storage firebase
import {storage,db} from "./../../firebase"
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// context api data
import { useOfContext } from "../../Context/ContextProvider";
 
//date formate
import { format } from 'date-fns';

const Sidebar = () => {
  // modal style---------------------
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
  };

//useref
const fileInputRef = useRef(null);

  //   usestate---------------
  
  const [open, setOpen] = useState(false);
  const [uploading,setUploading] = useState(false);
  const [file,setFile] = useState(null);
  const [fileList,setFileList] = useState([]);

  // context data
  const dataCtx = useOfContext();

//   modal handle function
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//   file handle
const  onChangeHandleFile = (e)=>{
    if(fileInputRef.current.files[0]){
        setFile(fileInputRef.current.files[0]);
        
    }
}
console.log(file);

const handleUploadedFile = (e) => {
  e.preventDefault();
  setUploading(true);
  if (fileInputRef.current.files[0] == null) return;

  const fileRef = ref(storage, `files/${file.name}`);
  uploadBytes(fileRef, fileInputRef.current.files[0])
    .then((snapshot) => {
      console.log(snapshot);
      getDownloadURL(fileRef).then((url) => {
        setDoc(doc(collection(db, 'myfiles')), {
          timestamp: format(new Date(),'MM-dd-yyyy HH:mm:ss'),
          filename: file.name,
          fileURL: url,
          size: snapshot.metadata.size
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle the error, display a message to the user, or take appropriate action
      });
    })
    .catch((error) => {
      console.error("Error uploading bytes:", error);
      // Handle the error, display a message to the user, or take appropriate action
    })
    .finally(() => {
      dataCtx.setUploadFileStatus((prevState)=>!prevState);
      setUploading(false);
      setFile(null);
      setOpen(false);
      
    });
};

  return (
    <>
      <div className="sidebar-container">
        <button className="sidebar-button" onClick={handleOpen}>
          <AddIcon />
          New
        </button>
        
        {/* modal */}
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Text in a modal
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <form action="" >
                <h3>Select file you want to upload</h3>
                {uploading ? <p>loading...</p> : <><input type="file" onChange={onChangeHandleFile} ref={fileInputRef}/>
                <button onClick={handleUploadedFile} >Submit</button></>}
                
              </form>
            </Typography>
          </Box>
        </Modal>
        <div className="sidebar-options">
          <div className="sidebar-option">
            <MobileScreenShareOutlinedIcon />
            <span>My Drive</span>
          </div>
          <div className="sidebar-option">
            <DevicesOutlinedIcon />
            <span>Computers</span>
          </div>
          <div className="sidebar-option">
            <PeopleAltOutlinedIcon />
            <span>Shared with me</span>
          </div>
          <div className="sidebar-option">
            <QueryBuilderOutlinedIcon />
            <span>Recent</span>
          </div>
          <div className="sidebar-option">
            <StarBorderOutlinedIcon />
            <span>Starred</span>
          </div>
          <div className="sidebar-option">
            <DeleteOutlineOutlinedIcon />
            <span>Trash</span>
          </div>
          <div className="sidebar-storage">
            <div className="sidebar-option">
              <CloudQueueIcon />
              <span>Storage</span>
            </div>
            <input type="range" value="50%" />
            <p>106 GB of 200 GB used</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
