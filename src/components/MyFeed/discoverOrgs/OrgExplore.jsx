import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { getLaunchedOrgsData } from "../../../store/actions";
import Default from "../../../assets/images/logo.jpeg";

const OrgsExplore = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const launchedOrgs = useSelector(({ org }) => org.launched.data) || [0, 0, 0, 0];
  const dispatch = useDispatch();
  const firestore = useFirestore();

  useEffect(() => {
    getLaunchedOrgsData()(firestore, dispatch);
  }, [firestore, dispatch]);

  const mockOrgs = [
    { org_handle: "codelabzorg", org_name: "CORE", org_description: "Sustainable Computing Research — modern web tooling & green infrastructure." },
    { org_handle: "codelabzorg", org_name: "CORE", org_description: "Design systems and UI/UX research for sustainable digital experiences." },
    { org_handle: "codelabzorg", org_name: "CORE", org_description: "Android development and machine learning for edge computing research." },
    { org_handle: "codelabzorg", org_name: "CORE", org_description: "Cyber security research with a focus on sustainable computing practices." }
  ];

  const baseOrgs = launchedOrgs.length > 0 && launchedOrgs[0] !== 0 ? launchedOrgs : mockOrgs;

  // Ensure we always have at least 4 items to fill the grid by duplicating the available ones
  const displayOrgs = baseOrgs.length >= 4
    ? baseOrgs.slice(0, 4)
    : [...baseOrgs, ...Array(4 - baseOrgs.length).fill(baseOrgs[0])];

  const tabs = [
    { label: "All", value: "all" },
    { label: "Design", value: "design" },
    { label: "JavaScript", value: "javascript" },
    { label: "Web Dev", value: "webdev" },
    { label: "Android", value: "android" },
    { label: "AI / ML", value: "aiml" },
  ];

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  return (
    <section className="au au2">
      <div className="sec-head">
        <div className="sec-info">
          <div className="sec-title">Discover Organizations</div>
          <div className="sec-sub">Explore top-rated organizations and find what you're looking for</div>
        </div>
        <a href="#" className="view-all">
          View all
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="filter-row">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab ${selectedTab === tab.value ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="org-grid">
        {displayOrgs.map((org, i) => (
          <div key={i} className="org-card au">
            <div className="org-card-accent"></div>
            <div className="org-card-body">
              <div className="org-logo">
                <img src={org?.org_image || Default} alt={org?.org_name} />
              </div>
              <div className="org-info">
                <div className="org-name">{org?.org_name || org?.org_handle}</div>
                <div className="org-handle">{org?.org_handle}</div>
                <div className="org-desc">
                  {org?.org_description || "Explore top-rated organizations."}
                </div>
              </div>
              <div className="org-footer">
                <div className="org-stat">
                  <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {org?.members || "1,240"} members
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrgsExplore;
