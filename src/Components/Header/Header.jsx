import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar } from "@mui/material";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import './Header.css';
import { Link } from "react-router-dom";

// context
import { useOfContext } from "../../Context/ContextProvider";

const Header = () => {
  const [inputVal,setInputVal] = useState("");

  // context data
  const dataCtx = useOfContext();
  

  // handleSearchVal
  const handleSearchVal = (e)=>{
    setInputVal(e.target.value);
    dataCtx.setSearchVal(e.target.value);
  }

  return (
    <header className="header-container">
      {/* logo */}
      <div className="header-logo">
        <Link to={"/"}>
        <img
          src="https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png"
          alt="driveLogo"
        />
        </Link>
        <span>Drive</span>
      </div>

      {/* search icon */}
      <div className="header-searchbar">
        <SearchIcon />
        <input type="text" placeholder="Search in Drive" value={inputVal} onChange={handleSearchVal}/>
        <FormatAlignCenterIcon />
      </div>

      {/* icons */}
      <div className="header-icons">
      <OfflinePinIcon />
        <HelpOutlineIcon />
        <SettingsIcon/>
        <AppsIcon/>
        <Avatar/>
      </div>
    </header>
  );
};

export default Header;
