// src/VideoPlayer.js
import React from 'react';

export default function VideoPlayer({ url, onClose }) {
  const embedUrl = url.includes('youtube.com')
    ? `https://www.youtube.com/embed/${new URL(url).searchParams.get('v')}?autoplay=1`
    : url;

  return (
    <div
      className="video-modal"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div
        className="video-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '95vw',     // ← enforce your desired width
          height: '85vh',    // ← enforce your desired height
          background: '#fff',
          padding: '10px',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <iframe
          src={embedUrl}
          title="Video Player"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%' }}
        />
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 8, right: 8,
            background: 'transparent',
            border: 'none',
            fontSize: 28,
            color: '#333',
            cursor: 'pointer'
          }}
          aria-label="Close video player"
        >
          ×
        </button>
      </div>
    </div>
  );
}