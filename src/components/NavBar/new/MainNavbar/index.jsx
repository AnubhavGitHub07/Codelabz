import { IconButton, InputBase, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import Headroom from "react-headroom";
import SearchIcon from "@mui/icons-material/Search";
import RightMenu from "./RightMenu";
import LeftMenu from "./LeftMenu";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import SideBar from "../../../SideBar/index";
import useWindowSize from "../../../../helpers/customHooks/useWindowSize";
import "./MainNavbar.less";

function MainNavbar() {
  const history = useHistory();
  const windowSize = useWindowSize();
  const [openMenu, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const notifications = useSelector(
    state => state.notifications.data.notifications
  );
  const notificationCount = notifications?.filter(
    notification => !notification.isRead
  ).length;
  const profile = useSelector(state => state.firebase.profile);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <Headroom>
      <nav className="main-navbar">
        <div className="nav-logo-container">
          <div className="nav-logo-text" onClick={() => history.push("/")}>
            CodeLabz
          </div>
        </div>

        <form className="nav-search-container" onSubmit={handleSearch}>
          <InputBase
            className="nav-search-input"
            value={searchQuery}
            placeholder="Search..."
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className="nav-search-icon" />
              </InputAdornment>
            }
          />
        </form>

        <div className="nav-right-container">
          <div className="nav-avatar-circle" onClick={() => history.push("/profile")}>
            {profile.displayName ? profile.displayName.substring(0, 2).toUpperCase() : "CU"}
          </div>
        </div>

        <button className="nav-hamburger-btn" onClick={toggleSlider}>
          <MenuIcon />
        </button>

        {windowSize.width <= 960 && (
          <SideBar
            open={openMenu}
            toggleSlider={toggleSlider}
            notificationCount={notificationCount}
            drawWidth={960}
          />
        )}
      </nav>
    </Headroom>
  );
}

export default MainNavbar;
