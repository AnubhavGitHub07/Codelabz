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
          <section className="welcome au au1" data-testid="codefeedTitle">
            <div className="welcome-text">
              <h2 className="welcome-greeting">Welcome back, {profile.displayName || "User"}! 👋</h2>
              <p className="welcome-sub">
                You've completed <span>12 labs</span> this week. Explore new updates from <span>8 organizations</span> you follow.
              </p>

              <div className="welcome-stats">
                <div className="welcome-stat">
                  <div className="welcome-stat-value">24</div>
                  <div className="welcome-stat-label">Labs joined</div>
                </div>
                <div className="welcome-stat-divider"></div>
                <div className="welcome-stat">
                  <div className="welcome-stat-value">12</div>
                  <div className="welcome-stat-label">Orgs followed</div>
                </div>
                <div className="welcome-stat-divider"></div>
                <div className="welcome-stat">
                  <div className="welcome-stat-value">156</div>
                  <div className="welcome-stat-label">Contributions</div>
                </div>
              </div>
            </div>

            <div className="welcome-illo">
              <svg viewBox="0 0 116 106" fill="none">
                <circle cx="58" cy="56" r="48" fill="rgba(255,255,255,0.05)" />
                <circle cx="58" cy="56" r="34" fill="rgba(255,255,255,0.05)" />
                <path d="M40 38 L24 56 L40 72" stroke="rgba(255,255,255,0.92)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M76 38 L92 56 L76 72" stroke="rgba(255,255,255,0.92)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M67 32 L49 78" stroke="rgba(255,255,255,0.50)" stroke-width="4" stroke-linecap="round" />
                <circle className="dot1" cx="58" cy="13" r="5.5" fill="rgba(255,255,255,0.80)" />
                <circle className="dot2" cx="98" cy="76" r="4.5" fill="rgba(255,255,255,0.60)" />
                <circle className="dot3" cx="16" cy="82" r="4" fill="rgba(255,255,255,0.50)" />
                <line x1="58" y1="19.5" x2="58" y2="34" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-dasharray="3 3" />
                <line x1="94.5" y1="72.5" x2="85" y2="64" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" stroke-dasharray="3 3" />
                <line x1="19.5" y1="78.5" x2="28" y2="68" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" stroke-dasharray="3 3" />
              </svg>
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
