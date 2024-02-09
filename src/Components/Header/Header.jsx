import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar } from "@mui/material";
import OfflinePinOutlinedIcon from "@mui/icons-material/OfflinePinOutlined";
import "./Header.css";
import { Link } from "react-router-dom";

// context
import { useOfContext } from "../../Context/ContextProvider";

const Header = () => {
  const [inputVal, setInputVal] = useState("");

  // context data-----------------------------------------
  const dataCtx = useOfContext();

  // handleSearchVal------------------------------------
  const handleSearchVal = (e) => {
    setInputVal(e.target.value);
    dataCtx.setSearchVal(e.target.value);
  };

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
        <div className="header-serachbar-sub">
          <SearchIcon style={{ color: "rgb(90,93,93)", cursor: "pointer" }} />
          <input
            type="text"
            placeholder="Search in Drive"
            value={inputVal}
            onChange={handleSearchVal}
          />
        </div>
        <FormatAlignCenterIcon
          style={{
            marginRight: "20px",
            color: "rgb(90,93,93)",
            cursor: "pointer",
          }}
        />
      </div>

      {/* icons */}
      <div className="header-icons">
        <OfflinePinOutlinedIcon
          style={{ color: "rgb(90,93,93)", cursor: "pointer" }}
        />
        <HelpOutlineIcon
          style={{ color: "rgb(90,93,93)", cursor: "pointer" }}
        />
        <SettingsOutlinedIcon
          style={{ color: "rgb(90,93,93)", cursor: "pointer" }}
        />
        <AppsIcon style={{ color: "rgb(90,93,93)", cursor: "pointer" }} />
        <Avatar style={{ width: "30px", height: "30px", cursor: "pointer" }} />
      </div>
    </header>
  );
};

export default Header;
