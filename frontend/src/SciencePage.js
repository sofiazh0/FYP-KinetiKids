import React, { useState } from 'react';
import './SciencePage.css'; // or wherever your styles are
import VideoPlayer from './VideoPlayer';

// Video data for each grade
const grade1Videos = [
  { title: "Parts of Plants", url: "https://www.youtube.com/watch?v=X6TLFZUC9gI", thumbnail: "https://img.youtube.com/vi/X6TLFZUC9gI/maxresdefault.jpg" },
  { title: "Life Cycle of a Plant", url: "https://www.youtube.com/watch?v=2SBVz4MgeIE", thumbnail: "https://img.youtube.com/vi/2SBVz4MgeIE/maxresdefault.jpg" },
  { title: "Animal Classification", url: "https://www.youtube.com/watch?v=EDIcqxwxb90", thumbnail: "https://img.youtube.com/vi/EDIcqxwxb90/maxresdefault.jpg" },
  { title: "Different Types of Weathers", url: "https://www.youtube.com/watch?v=sn6GLgaTY0M", thumbnail: "https://img.youtube.com/vi/sn6GLgaTY0M/maxresdefault.jpg" },
  { title: "Different Types of Seasons", url: "https://www.youtube.com/watch?v=C_Sc5ZjdfFI", thumbnail: "https://img.youtube.com/vi/C_Sc5ZjdfFI/maxresdefault.jpg" },
  { title: "Tools to Measure Weather", url: "https://www.youtube.com/watch?v=e3inavDlwfk", thumbnail: "https://img.youtube.com/vi/e3inavDlwfk/maxresdefault.jpg" },
  { title: "Different States of Matter", url: "https://www.youtube.com/watch?v=JQ4WduVp9k4", thumbnail: "https://img.youtube.com/vi/JQ4WduVp9k4/maxresdefault.jpg" },
  { title: "Properties of Matter", url: "https://www.youtube.com/watch?v=1UUROogwl24", thumbnail: "https://img.youtube.com/vi/1UUROogwl24/maxresdefault.jpg" },
  { title: "Five Senses of Human Beings", url: "https://www.youtube.com/watch?v=XUMiPK6LZBI", thumbnail: "https://img.youtube.com/vi/XUMiPK6LZBI/maxresdefault.jpg" },
  { title: "Simple Machines", url: "https://www.youtube.com/watch?v=tk9iUjMEnaY", thumbnail: "https://img.youtube.com/vi/tk9iUjMEnaY/maxresdefault.jpg" }
];

const grade2Videos = [
  { title: "Plant Habitats", url: "https://www.youtube.com/watch?v=4o2DAdltZLo", thumbnail: "https://img.youtube.com/vi/4o2DAdltZLo/maxresdefault.jpg" },
  { title: "Animal Habitat", url: "https://www.youtube.com/watch?v=5hFoZq0qgrM", thumbnail: "https://img.youtube.com/vi/5hFoZq0qgrM/maxresdefault.jpg" },
  { title: "Different Habitats (Forest, Desert, Ocean, etc.)", url: "https://youtu.be/x7jwJ2bI9Lg", thumbnail: "https://img.youtube.com/vi/x7jwJ2bI9Lg/maxresdefault.jpg" },
  { title: "Food Chains Compilation", url: "https://www.youtube.com/watch?v=CZhE2p46vJk", thumbnail: "https://img.youtube.com/vi/CZhE2p46vJk/maxresdefault.jpg" },
  { title: "Food Webs", url: "https://www.youtube.com/watch?v=Vtb3I8Vzlfg", thumbnail: "https://img.youtube.com/vi/Vtb3I8Vzlfg/maxresdefault.jpg" },
  { title: "Food Webs in Ecosystems", url: "https://www.youtube.com/watch?v=lmDn2o1HETI", thumbnail: "https://img.youtube.com/vi/lmDn2o1HETI/maxresdefault.jpg" },
  { title: "Earth's Rotation & Revolution", url: "https://www.youtube.com/watch?v=l64YwNl1wr0", thumbnail: "https://img.youtube.com/vi/l64YwNl1wr0/maxresdefault.jpg" },
  { title: "The Earth's Rotation (Day and Night)", url: "https://www.youtube.com/watch?v=1BTUXkZALIg", thumbnail: "https://img.youtube.com/vi/1BTUXkZALIg/maxresdefault.jpg" },
  { title: "Earth's Orbit and Rotation - The Sun, Earth and Moon", url: "https://www.youtube.com/watch?v=HLhnXu71OKo", thumbnail: "https://img.youtube.com/vi/HLhnXu71OKo/maxresdefault.jpg" },
  { title: "The Solar System for Kids", url: "https://www.youtube.com/watch?v=bf40ruY8UOs", thumbnail: "https://img.youtube.com/vi/bf40ruY8UOs/maxresdefault.jpg" }
];

const grade3Videos = [
  { title: "Animal Adaptation", url: "https://www.youtube.com/watch?v=m2MibjJgyjs", thumbnail: "https://img.youtube.com/vi/m2MibjJgyjs/maxresdefault.jpg" },
  { title: "Forms of Energy", url: "https://www.youtube.com/watch?v=9Nn91FlQs5g", thumbnail: "https://img.youtube.com/vi/9Nn91FlQs5g/maxresdefault.jpg" },
  { title: "Types of Energy", url: "https://www.youtube.com/watch?v=w16-Uems2Qo", thumbnail: "https://img.youtube.com/vi/w16-Uems2Qo/maxresdefault.jpg" },
  { title: "Water Cycle", url: "https://www.youtube.com/watch?v=TD3XSIE4ymo", thumbnail: "https://img.youtube.com/vi/TD3XSIE4ymo/maxresdefault.jpg" },
  { title: "Importance of Water", url: "https://www.youtube.com/watch?v=rEJ5yuFR3f8", thumbnail: "https://img.youtube.com/vi/rEJ5yuFR3f8/maxresdefault.jpg" },
  { title: "Types of Soil", url: "https://www.youtube.com/watch?v=-6BaL-VV1wA", thumbnail: "https://img.youtube.com/vi/-6BaL-VV1wA/maxresdefault.jpg" },
  { title: "Types of Rock", url: "https://www.youtube.com/watch?v=17l2LrjZi9o", thumbnail: "https://img.youtube.com/vi/17l2LrjZi9o/maxresdefault.jpg" },
  { title: "Simple Machines", url: "https://www.youtube.com/watch?v=s03LgyIgCtw", thumbnail: "https://img.youtube.com/vi/s03LgyIgCtw/maxresdefault.jpg" }
];

const grade4Videos = [
  { title: "What are Habitats", url: "https://www.youtube.com/watch?v=40B2IjLWfTQ", thumbnail: "https://img.youtube.com/vi/40B2IjLWfTQ/maxresdefault.jpg" },
  { title: "What is Biodiversity?", url: "https://www.youtube.com/watch?v=b6Ua_zWDH6U", thumbnail: "https://img.youtube.com/vi/b6Ua_zWDH6U/maxresdefault.jpg" },
  { title: "Different Types of Ecosystems", url: "https://www.youtube.com/watch?v=HQL_rMANFCM", thumbnail: "https://img.youtube.com/vi/HQL_rMANFCM/maxresdefault.jpg" },
  { title: "What is Weather and How Does it Work?", url: "https://www.youtube.com/watch?v=nNmWAo0kDGk", thumbnail: "https://img.youtube.com/vi/nNmWAo0kDGk/maxresdefault.jpg" },
  { title: "3 Main Climate Zones", url: "https://www.youtube.com/watch?v=Kp7ZhvJXrMc", thumbnail: "https://img.youtube.com/vi/Kp7ZhvJXrMc/maxresdefault.jpg" },
  { title: "Open and Closed Circuit", url: "https://www.youtube.com/watch?v=IYT-uxKTozA", thumbnail: "https://img.youtube.com/vi/IYT-uxKTozA/maxresdefault.jpg" },
  { title: "Conductors and Insulators", url: "https://www.youtube.com/watch?v=qZjDMQbn3a0", thumbnail: "https://img.youtube.com/vi/qZjDMQbn3a0/maxresdefault.jpg" },
  { title: "Human Body Organs", url: "https://www.youtube.com/watch?v=i5aXwiC3wWc", thumbnail: "https://img.youtube.com/vi/i5aXwiC3wWc/maxresdefault.jpg" },
  { title: "Healthy Habits", url: "https://www.youtube.com/watch?v=dhpCdqOtuj0", thumbnail: "https://img.youtube.com/vi/dhpCdqOtuj0/maxresdefault.jpg" },
  { title: "Work, Force and Energy", url: "https://www.youtube.com/watch?v=5-2NLHB4Gxg", thumbnail: "https://img.youtube.com/vi/5-2NLHB4Gxg/maxresdefault.jpg" }
];

const grade5Videos = [
  { title: "Planets in The Solar System", url: "https://www.youtube.com/watch?v=e8YzKyot4Pc", thumbnail: "https://img.youtube.com/vi/e8YzKyot4Pc/maxresdefault.jpg" },
  { title: "Earth's Rotation and Reason for Seasons", url: "https://www.youtube.com/watch?v=6SzjlsuyTdk", thumbnail: "https://img.youtube.com/vi/6SzjlsuyTdk/maxresdefault.jpg" },
  { title: "Water cycle Explanation", url: "https://www.youtube.com/watch?v=lFgnymK7pJA", thumbnail: "https://img.youtube.com/vi/lFgnymK7pJA/maxresdefault.jpg" },
  { title: "Types of Clouds", url: "https://www.youtube.com/watch?v=jKBgoX1vGnE", thumbnail: "https://img.youtube.com/vi/jKBgoX1vGnE/maxresdefault.jpg" },
  { title: "Weather and Weather Tools", url: "https://www.youtube.com/watch?v=e3inavDlwfk", thumbnail: "https://img.youtube.com/vi/e3inavDlwfk/maxresdefault.jpg" },
  { title: "Changes of State of Matter", url: "https://www.youtube.com/watch?v=vNvElea-124", thumbnail: "https://img.youtube.com/vi/vNvElea-124/maxresdefault.jpg" },
  { title: "Solutions and Mixtures", url: "https://www.youtube.com/watch?v=6WpRELNo7k8", thumbnail: "https://img.youtube.com/vi/6WpRELNo7k8/maxresdefault.jpg" },
  { title: "Physical and Chemical Changes", url: "https://www.youtube.com/watch?v=BOr76Zx48QM", thumbnail: "https://img.youtube.com/vi/BOr76Zx48QM/maxresdefault.jpg" },
  { title: "Food Chain", url: "https://www.youtube.com/watch?v=0DL4AUBe3WA", thumbnail: "https://img.youtube.com/vi/0DL4AUBe3WA/maxresdefault.jpg" },
  { title: "Human Impact on Environment", url: "https://www.youtube.com/watch?v=Um-bo2MWDsQ", thumbnail: "https://img.youtube.com/vi/Um-bo2MWDsQ/maxresdefault.jpg" }
];

export default function SciencePage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="science-page">
      {/* Video modal */}
      {selectedVideo && (
        <VideoPlayer url={selectedVideo.url} onClose={handleClosePlayer} />
      )}

      {/* Grade sections */}
      <VideoSection grade="1" videos={grade1Videos} onVideoClick={handleVideoSelect} />
      <VideoSection grade="2" videos={grade2Videos} onVideoClick={handleVideoSelect} />
      <VideoSection grade="3" videos={grade3Videos} onVideoClick={handleVideoSelect} />
      <VideoSection grade="4" videos={grade4Videos} onVideoClick={handleVideoSelect} />
      <VideoSection grade="5" videos={grade5Videos} onVideoClick={handleVideoSelect} />
    </div>
  );
}

function VideoSection({ grade, videos, onVideoClick }) {
  return (
    <section aria-label={`Grade ${grade}`} className="grade-section">
      <h2>Grade {grade}</h2>
      <div className="video-slider">
        {videos.map((video) => (
          <div
            key={video.url}
            className="video-card"
            onClick={() => onVideoClick(video)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="video-thumbnail"
              loading="lazy"
            />
            <h3 className="video-title">{video.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
