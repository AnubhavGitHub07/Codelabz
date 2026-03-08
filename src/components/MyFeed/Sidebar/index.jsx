import React, { useState } from "react";
import Box from "@mui/material/Box";

const Sidebar = () => {
    const [tagsExpanded, setTagsExpanded] = useState(false);
    const [trendingExpanded, setTrendingExpanded] = useState(false);
    const [orgsExpanded, setOrgsExpanded] = useState(false);

    const tags = [
        { label: "HTML" }, { label: "JavaScript", pop: true }, { label: "CSS" }, { label: "Python", pop: true },
        { label: "React", pop: true }, { label: "Java" }, { label: "System Design", pop: true }, { label: "Cyber Security" },
        { label: "Node" }, { label: "Django" }, { label: "C++" }, { label: "GoLang" },
        { label: "ML", pop: true }, { label: "AI/ML", pop: true }, { label: "Cloud" }, { label: "DevOps" },
        { label: "Figma" }, { label: "Angular" },
    ];

    const trendingTopics = [
        { label: "#JavaScript", count: "4,280 codelabz", pct: 100 },
        { label: "#System Design", count: "3,120 codelabz", pct: 73 },
        { label: "#Python", count: "2,870 codelabz", pct: 67 },
        { label: "#DevOps", count: "1,940 codelabz", pct: 45 },
        { label: "#AI/ML", count: "1,760 codelabz", pct: 41 },
        { label: "#ReactJS", count: "1,240 codelabz", pct: 30 },
        { label: "#CloudNative", count: "980 codelabz", pct: 24 },
    ];

    const suggestedOrgs = [
        { name: "CORE", handle: "codelabzorg" },
        { name: "DesignHub", handle: "designhub" },
        { name: "WebMasters", handle: "webmasters" },
        { name: "AppDev", handle: "appdev_community" },
        { name: "OpenSource", handle: "os_contrib" },
    ];

    const visibleTags = tagsExpanded ? tags : tags.slice(0, 10);
    const visibleTrending = trendingExpanded ? trendingTopics : trendingTopics.slice(0, 3);
    const visibleOrgs = orgsExpanded ? suggestedOrgs : suggestedOrgs.slice(0, 3);

    return (
        <Box>
            {/* Popular Tags */}
            <Box className="s-card au au4" mb={2}>
                <div className="s-title">Popular Tags</div>
                <div className="tags-wrap">
                    {visibleTags.map((tag, i) => (
                        <div key={i} className={`tag ${tag.pop ? 'pop' : ''}`}>
                            {tag.label}
                        </div>
                    ))}
                </div>
                {!tagsExpanded && tags.length > 10 && (
                    <button className="s-show-more" onClick={() => setTagsExpanded(true)}>
                        + Show more tags
                    </button>
                )}
            </Box>

            {/* Trending Topics */}
            <Box className="s-card au au5" mb={2}>
                <div className="s-title">Trending Topics</div>
                {visibleTrending.map((topic, i) => (
                    <div key={i} className="trend-item">
                        <div className="trend-rank">{(i + 1).toString().padStart(2, '0')}</div>
                        <div>
                            <div className="trend-name">{topic.label}</div>
                            <div className="trend-count">{topic.count}</div>
                        </div>
                        <div className="trend-bar-wrap">
                            <div className="trend-bar">
                                <div className="trend-bar-fill" style={{ width: `${topic.pct}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
                {!trendingExpanded && trendingTopics.length > 3 && (
                    <button className="s-show-more" onClick={() => setTrendingExpanded(true)}>
                        + Show more topics
                    </button>
                )}
            </Box>

            {/* Suggested Organizations */}
            <Box className="s-card au au6">
                <div className="s-title">Suggested for You</div>
                {visibleOrgs.map((org, i) => (
                    <div key={i} className="sug-item">
                        <div className="sug-logo">
                            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '.7rem', color: 'var(--teal)' }}>
                                {org.name.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <div className="sug-info">
                            <div className="sug-name">{org.name}</div>
                            <div className="sug-handle">{org.handle}</div>
                        </div>
                        <button className="sug-follow">Follow</button>
                    </div>
                ))}
                {!orgsExpanded && suggestedOrgs.length > 3 && (
                    <button className="s-show-more" onClick={() => setOrgsExpanded(true)}>
                        + Show more for you
                    </button>
                )}
            </Box>
        </Box>
    );
};

export default Sidebar;
