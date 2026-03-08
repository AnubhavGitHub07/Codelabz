import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore, useFirebase } from "react-redux-firebase";
import {
  getTutorialFeedIdArray,
  getTutorialFeedData
} from "../../../store/actions/tutorialPageActions";
import Default from "../../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import useWindowSize from "../../../helpers/customHooks/useWindowSize";

const CodelabzExplore = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 3;
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= 640;

  const tutorialFeedArray = useSelector(
    ({ tutorialPage }) => tutorialPage.feed.homepageFeedArray
  ) || [];

  const profileData = useSelector(({ firebase: { profile } }) => profile);
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const firebase = useFirebase();

  useEffect(() => {
    const getFeed = async () => {
      if (profileData.uid) {
        const tutorialIdArray = await getTutorialFeedIdArray(profileData.uid)(
          firebase,
          firestore,
          dispatch
        );
        getTutorialFeedData(tutorialIdArray)(firebase, firestore, dispatch);
      }
    };
    getFeed();
  }, [profileData.uid, firestore, dispatch]);

  const tabs = [
    { label: "🔥 Trending", value: "trending", count: 3 },
    { label: "⭐ Best of Month", value: "best", count: 3 },
    { label: "✨ Featured", value: "featured", count: 2 },
  ];

  const mockData = [
    {
      tutorial_id: "1",
      title: "Building Scalable REST APIs with Node.js & Express",
      org_name: "CORE",
      timeToRead: "2h ago",
      views: "1.2k",
      type: "Hot",
      featured_image: Default
    },
    {
      tutorial_id: "2",
      title: "Intro to Jetpack Compose - UI for Android Developers",
      org_name: "CORE",
      timeToRead: "5h ago",
      views: "940",
      type: "Trending",
      featured_image: Default
    },
    {
      tutorial_id: "3",
      title: "CSS Grid vs Flexbox: When to Use Which",
      org_name: "CORE",
      timeToRead: "8h ago",
      views: "2.1k",
      type: "Hot",
      featured_image: Default
    },
    {
      tutorial_id: "4",
      title: "Complete Python for Data Science – Beginner to Pro",
      org_name: "CORE",
      timeToRead: "Mar 1",
      views: "8.4k",
      type: "Trending",
      featured_image: Default
    },
    {
      tutorial_id: "5",
      title: "Figma Design Systems That Scale",
      org_name: "CORE",
      timeToRead: "Feb 28",
      views: "5.6k",
      type: "Hot",
      featured_image: Default
    },
    {
      tutorial_id: "6",
      title: "Docker & Kubernetes Zero to Hero",
      org_name: "CORE",
      timeToRead: "Feb 25",
      views: "1.2k",
      type: "Trending",
      featured_image: Default
    }
  ];

  const displayItems = tutorialFeedArray.length > 0 ? tutorialFeedArray : mockData;

  const getFilteredItems = () => {
    // Ensure we show up to 6 items to fill the 2-column grid effectively
    if (activeTab === "trending") return displayItems.slice(0, 6);
    if (activeTab === "best") return displayItems.slice(1, 6);
    return displayItems.slice(0, 4);
  };

  const filteredItems = getFilteredItems();
  const visibleItems = (!isMobile || showAll) ? filteredItems : filteredItems.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = filteredItems.length > INITIAL_DISPLAY_COUNT;

  return (
    <section className="au au3">
      <div className="sec-head">
        <div className="sec-info">
          <div className="sec-title">Discover Codelabz</div>
          <div className="sec-sub">Explore top-rated codelabz and find what you're looking for</div>
        </div>
        <a href="#" className="view-all">
          View all
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="feed-card">
        <div className="feed-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`feed-tab ${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.value); setShowAll(false); }}
            >
              {tab.label} <span className="tab-badge">{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="feed-body">
          <div className="feed-pane active">
            {visibleItems.map((tutorial, i) => (
              <Link key={i} to={`/tutorial/${tutorial?.tutorial_id}`} style={{ textDecoration: 'none' }}>
                <div className="feed-item">
                  <div className="feed-index">{(i + 1).toString().padStart(2, '0')}</div>
                  <div className="feed-thumb">
                    <img src={tutorial?.featured_image || Default} alt={tutorial?.title} />
                  </div>
                  <div className="feed-content">
                    <div className="feed-title">{tutorial?.title}</div>
                    <div className="feed-meta">
                      <span className="feed-meta-org">{tutorial?.org_name || "CodeLabz"}</span>
                      <div className="feed-meta-dot"></div>
                      <span>{tutorial?.timeToRead || "5 min read"}</span>
                      <div className="feed-meta-dot"></div>
                      <span className="meta-pill pill-views">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '3px' }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        {tutorial?.views || "1.2k"}
                      </span>
                      <div className="feed-meta-dot"></div>
                      <span className={`meta-pill ${tutorial?.type === 'Hot' ? 'pill-fire' : 'pill-star'}`}>
                        {tutorial?.type === 'Hot' ? '🔥 Hot' : '👁️ Trending'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {hasMore && (
          <button
            className="show-more-feed-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Show Less
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </>
            ) : (
              <>
                Show More ({filteredItems.length - INITIAL_DISPLAY_COUNT} more)
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default CodelabzExplore;
