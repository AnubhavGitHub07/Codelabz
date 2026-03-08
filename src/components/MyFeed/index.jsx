import Box from "@mui/material/Box";
import React from "react";
import OrgsExplore from "./discoverOrgs/OrgExplore";
import CodelabzExplore from "./DiscoverCodelabz/CodelabzExplore";
import SideBar from "./Sidebar";
import "./MyFeed.less";
import { useSelector } from "react-redux";

const MyFeed = () => {
  const profile = useSelector(state => state.firebase.profile);

  return (
    <div className="myfeed-wrapper">
      <Box className="myfeed-page">
        <main className="myfeed-main">
          <section className="welcome au au1" data-testId="codefeedTitle">
            <div className="welcome-text">
              <div className="welcome-greeting">Welcome back, {profile.displayName || "User"}! 👋</div>
              <div className="welcome-sub">Check out the latest from your <span>CodeLabz Feed</span></div>
            </div>
            <div className="welcome-actions">
              <button className="welcome-btn primary">Create New</button>
              <button className="welcome-btn ghost">Settings</button>
            </div>
          </section>
          <OrgsExplore />
          <CodelabzExplore />
        </main>

        <aside className="myfeed-side">
          <SideBar />
        </aside>

        {/* Mobile Bottom Nav */}
        <div className="mob-nav">
          <button className="mob-nav-btn active">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Feed
          </button>
          <button className="mob-nav-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            Discover
          </button>
          <button className="mob-nav-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            More
          </button>
        </div>
      </Box>
    </div>
  );
};

export default MyFeed;
