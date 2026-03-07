import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import Box from "@mui/material/Box";
import Default from "../../../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { getLaunchedOrgsData } from "../../../../store/actions";

const OrgsCarousel = ({ filter = "all" }) => {
  const launchedOrgs = useSelector(({ org }) => org.launched.data) || [0, 0, 0, 0];
  const dispatch = useDispatch();
  const firestore = useFirestore();

  useEffect(() => {
    getLaunchedOrgsData()(firestore, dispatch);
  }, [firestore, dispatch]);

  // Use real data if available, otherwise fallback to mock for visual completeness
  const displayOrgs = launchedOrgs.length > 0 && launchedOrgs[0] !== 0
    ? launchedOrgs
    : [
      { org_handle: "codelabzorg", org_name: "CORE", org_description: "Sustainable Computing Research — modern web tooling & green infrastructure." },
      { org_handle: "designhub", org_name: "DesignHub", org_description: "Design systems and UI/UX research for sustainable digital experiences." },
      { org_handle: "webmasters", org_name: "WebMasters", org_description: "Modern web development and infrastructure research." },
      { org_handle: "cybersec", org_name: "CyberSec", org_description: "Cyber security research with a focus on sustainable practices." }
    ];

  const filteredOrgs = displayOrgs.filter(org => {
    if (org === 0) return true;
    if (filter === "all") return true;
    return org.tags ? org.tags.includes(filter) : true;
  });

  return (
    <Box className="org-carousel-container">
      <Swiper
        modules={[Navigation]}
        navigation={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        grabCursor={true}
        spaceBetween={16}
        className="mySwiper"
        style={{ padding: "10px 0 40px" }}
      >
        {filteredOrgs.map((org, i) => (
          <SwiperSlide key={i}>
            {org === 0 ? (
              <div className="org-card au">
                <div className="org-card-body">
                  <Skeleton variant="rectangular" height={80} />
                  <Skeleton width="80%" height={24} style={{ marginTop: 10 }} />
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="100%" height={60} style={{ marginTop: 10 }} />
                </div>
              </div>
            ) : (
              <div className="org-card au" style={{ height: '100%' }}>
                <div className="org-card-accent"></div>
                <div className="org-card-body">
                  <div className="org-logo">
                    <img src={org?.org_image || Default} alt={org?.org_name} />
                  </div>
                  <div className="org-info">
                    <div className="org-name">{org?.org_name || org?.org_handle}</div>
                    <div className="org-handle">@{org?.org_handle}</div>
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
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default OrgsCarousel;
