import { useEffect, useState } from "react";
import "./Data.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

// firesstore
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// use context data
import { useOfContext } from "../../Context/ContextProvider";




const Data = ({ fileState }) => {
  // state for files data
  const [files, setFiles] = useState([]);
  const [mainFiles, setMainFiles] = useState();
  const [emptyDriveText, setEmptyDriveText] = useState(false);

  // context data

  const dataCtx = useOfContext();
  useEffect(() => {
    if (dataCtx.searchVal == "") {
      setFiles(mainFiles);
    } else {
      const filterData = files.filter((file) => {
        return file.data.filename?.toLowerCase()
          .includes(dataCtx.searchVal?.toLowerCase());
      });
      setFiles(filterData);
    }
  }, [dataCtx.searchVal]);

  //component is loaded then my files will be shown
  useEffect(() => {
    // Execute the query
    // let fetchdatafromstore = () => {
      const unsubscribe = onSnapshot(collection(db, "myfiles"), (querySnapshot) => {
        const updatedFiles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setFiles(updatedFiles);
        setMainFiles(updatedFiles);
      });
        
     
    // };
    // fetchdatafromstore();
    console.log("data useeefect is runng");
  }, [dataCtx.uploadFileStatus]);

  // handle delete files
  let hadleDeleteFile = async (id) => {
    let fileData = [...files];
    let filterData = fileData.filter((file) => {
      return file.id != id;
    });
    setFiles(filterData);
    setMainFiles(filterData);
    // delete file data from the database
    try {
      await deleteDoc(doc(db, "myfiles", id));
    } catch (error) {
      alert(`Error occured when deleting file from the database ${error}`);
    }
  };

  // Convert bytes to different units
  const convertBytes = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 Byte";

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + " " + sizes[i];
  };




 

  return (
    <div className="data-main-container">
      {/* data top  */}
      <div className="data-top-container">
        <div className="left-data-header">
          <span>My Drive</span>
          <ArrowDropDownIcon />
        </div>
        <div className="right-data-header">
          <div>
            <MenuIcon />
            <GridViewOutlinedIcon />
          </div>
          <InfoOutlinedIcon />
        </div>
      </div>

      {/* data types */}
      <div className="data-types-filter">
        <button>
          Type
          <ArrowDropDownIcon />
        </button>
        <button>
          People
          <ArrowDropDownIcon />
        </button>
        <button>
          Modified
          <ArrowDropDownIcon />
        </button>
      </div>

      {/*data category and information  */}
      <div className="data-info">
        <div className="data-info-heading">
          <p>Name</p>
          <p>Owner</p>
          <p>Last Modified</p>
          <p>File Size</p>
        </div>

        {files.map((file) => (
          <div className="data-info-heading" key={file.id}>
            <p>{file.data.filename}</p>
            <p>Owner</p>
            <p>
            {file.data.timestamp && (
  <p>
    {file.data.timestamp}
  </p>
)}
            </p>
            <p>
              {file.data.size
                ? convertBytes(file.data.size)
                : "Size not available"}
            </p>
            <div className="data-icons">
              <a
                className="data-download-icon"
                href={file.data.fileURL}
                target="_blank"
              >
                <FileDownloadOutlinedIcon />
              </a>
              <button
                className="data-delete-icon"
                onClick={() => hadleDeleteFile(file.id)}
              >
                <DeleteOutlineOutlinedIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
