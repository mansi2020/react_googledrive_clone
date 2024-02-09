import { useEffect, useState } from "react";
import "./Data.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import { Avatar } from "@mui/material";

// firesstore------------------------------------------
import { db } from "../../firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// use context data------------------------------------
import { useOfContext } from "../../Context/ContextProvider";

const Data = () => {
  // state for files data--------------------------------
  const [files, setFiles] = useState([]);
  const [mainFiles, setMainFiles] = useState();

  // context data---------------------------------
  const dataCtx = useOfContext();
  useEffect(() => {
    if (dataCtx.searchVal == "") {
      setFiles(mainFiles);
    } else {
      const filterData = files.filter((file) => {
        return file.data.filename
          ?.toLowerCase()
          .includes(dataCtx.searchVal?.toLowerCase());
      });
      setFiles(filterData);
    }
  }, [dataCtx.searchVal]);

  //component is loaded then my files will be shown-----------------------------------
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "myfiles"),
      (querySnapshot) => {
        const updatedFiles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setFiles(updatedFiles);
        setMainFiles(updatedFiles);
      }
    );
  }, [dataCtx.uploadFileStatus]);

  // handle delete files-----------------------------------
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

  // Convert bytes to different units-----------------------------
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
          <div className="right-data-header-div">
            <div className="right-data-header-1">
              <MenuIcon style={{ fontSize: "20px" }} />
            </div>
            <div className="right-data-header-2">
              <GridViewOutlinedIcon style={{ fontSize: "20px" }} />
            </div>
          </div>
          <InfoOutlinedIcon />
        </div>
      </div>

      {/* data types */}
      <div className="data-types-filter">
        <button>
          Type
          <ArrowDropDownIcon
            className="data-types-filter-icon"
            style={{ fontSize: "18px" }}
          />
        </button>
        <button>
          People
          <ArrowDropDownIcon
            className="data-types-filter-icon"
            style={{ fontSize: "18px" }}
          />
        </button>
        <button>
          Modified
          <ArrowDropDownIcon
            className="data-types-filter-icon"
            style={{ fontSize: "18px" }}
          />
        </button>
      </div>

      {/*data category and information  */}
      <div className="data-info">
        <div className="data-info-heading header-data-info">
          <p className="data-info-1">Name</p>
          <p className="data-info-2">Owner</p>
          <p className="data-info-3">Last Modified</p>
          <p className="data-info-4">File Size</p>
          <p className="data-info-5"></p>
        </div>

        {files.map((file) => (
          <div
            className="data-info-heading data-info-heading-hover"
            key={file.id}
          >
            <p className="data-info-1">
              <PermMediaOutlinedIcon
                style={{
                  marginRight: "10px",
                  marginLeft: "10px",
                  color: "rgb(110, 110, 110)",
                }}
              />
              <span>{file.data.filename}</span>
            </p>
            <p className="data-avtar-para data-info-2">
              <Avatar style={{ height: "25px", width: "25px" }} />
              <span style={{ marginLeft: "10px" }}>me</span>
            </p>
            <p className="data-info-3">
              {file.data.timestamp && <p>{file.data.timestamp}</p>}
            </p>
            <p className="data-info-4">
              {file.data.size
                ? convertBytes(file.data.size)
                : "Size not available"}
            </p>
            <div className="data-icons data-info-5">
              <a
                id="data-dowload-icon-anchor"
                className="data-download-icon"
                href={file.data.fileURL}
                target="_blank"
              >
                <FileDownloadOutlinedIcon style={{ color: "grey" }} />
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
