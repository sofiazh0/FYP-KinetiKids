import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import "./VideoLibraryEN.css";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // Ensure your API key is loaded
const CHANNEL_ID = "UCIrfp0tjWW5QowJCJlsklWQ"; // Replace with your actual YouTube channel ID
const MAX_RESULTS = 12; // Number of videos to fetch

const VideoLibraryEN = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("Fetching videos from YouTube API...");
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.items) {
          setVideos(
            data.items.map((video) => ({
              id: video.id.videoId,
              title: video.snippet.title,
              thumbnail: video.snippet.thumbnails.high.url,
              url: `https://www.youtube.com/embed/${video.id.videoId}`,
            }))
          );
        } else {
          setError("No videos found.");
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setError("Failed to load videos. Please try again later.");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-library-en">
      <NavbarHome />

      {/* ✅ Search Bar */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
          aria-label="Search videos"
        />
      </div>

      {/* ✅ Video Grid */}
      <div className="video-grid">
        {error ? (
          <p className="error-message">{error}</p>
        ) : videos.length > 0 ? (
          videos
            .filter((video) =>
              video.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((video) => (
              <div key={video.id} className="video-card" onClick={() => setSelectedVideo(video)}>
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="video-info">
                  <h3>{video.title}</h3>
                </div>
              </div>
            ))
        ) : (
          <p className="no-videos">Loading videos...</p>
        )}
      </div>

      {/* ✅ Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="800"
              height="450"
              src={`${selectedVideo.url}?autoplay=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              aria-label={selectedVideo.title}
            ></iframe>
            <h3>{selectedVideo.title}</h3>
            <button className="close-btn" onClick={() => setSelectedVideo(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLibraryEN;
