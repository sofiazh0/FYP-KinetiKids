import React, { useState } from 'react';
import Navbar from './Navbar';
import "./MathPage.css";
import VideoPlayer from './VideoPlayer';

// Video data for each grade
const grade1Videos = [
  { title: "Counting to 100", url: "https://www.youtube.com/watch?v=xZSTL39XmdA", thumbnail: "https://img.youtube.com/vi/xZSTL39XmdA/maxresdefault.jpg" },
  { title: "Counting Forward and Backward", url: "https://www.youtube.com/watch?v=c9wNfQg383o", thumbnail: "https://img.youtube.com/vi/c9wNfQg383o/maxresdefault.jpg" },
  { title: "Numbers Counting to 100 & 1000", url: "https://www.youtube.com/watch?v=_rL1E8nFXro", thumbnail: "https://img.youtube.com/vi/_rL1E8nFXro/maxresdefault.jpg" },
  { title: "Odd and Even Numbers", url: "https://www.youtube.com/watch?v=eF_FxSW8QwY", thumbnail: "https://img.youtube.com/vi/eF_FxSW8QwY/maxresdefault.jpg" },
  { title: "Addition", url: "https://www.youtube.com/watch?v=uRoJ5E-Xx9s", thumbnail: "https://img.youtube.com/vi/uRoJ5E-Xx9s/maxresdefault.jpg" },
  { title: "Subtraction", url: "https://www.youtube.com/watch?v=qM7B2nwpV1M", thumbnail: "https://img.youtube.com/vi/qM7B2nwpV1M/maxresdefault.jpg" },
  { title: "Simple Addition and Subtraction (1-20)", url: "https://www.youtube.com/watch?v=zJyT6MIlkAw", thumbnail: "https://img.youtube.com/vi/zJyT6MIlkAw/maxresdefault.jpg" },
  { title: "Word Problems", url: "https://www.youtube.com/watch?v=C229LUk380Q", thumbnail: "https://img.youtube.com/vi/C229LUk380Q/maxresdefault.jpg" },
  { title: "Understanding Ones and Tens", url: "https://www.youtube.com/watch?v=1F3AycEDksY", thumbnail: "https://img.youtube.com/vi/1F3AycEDksY/maxresdefault.jpg" },
  { title: "Comparing Numbers", url: "https://www.youtube.com/watch?v=Qn87cKHa7v4", thumbnail: "https://img.youtube.com/vi/Qn87cKHa7v4/maxresdefault.jpg" },
  { title: "Measuring Length", url: "https://www.youtube.com/watch?v=D4VAoQomR4A", thumbnail: "https://img.youtube.com/vi/D4VAoQomR4A/maxresdefault.jpg" },
  { title: "Measuring Weight", url: "https://www.youtube.com/watch?v=-3sUa-2q928", thumbnail: "https://img.youtube.com/vi/-3sUa-2q928/maxresdefault.jpg" },
  { title: "Days of the Week and Months", url: "https://www.youtube.com/watch?v=2h1kvNRkabA", thumbnail: "https://img.youtube.com/vi/2h1kvNRkabA/maxresdefault.jpg" },
];

const grade2Videos = [
  { title: "Addition and Subtraction up to 100", url: "https://www.youtube.com/watch?v=lHIasWHn2HI", thumbnail: "https://img.youtube.com/vi/lHIasWHn2HI/maxresdefault.jpg" },
  { title: "Word Problems with Addition and Subtraction", url: "https://www.youtube.com/watch?v=efPbOfnbi7k", thumbnail: "https://img.youtube.com/vi/efPbOfnbi7k/maxresdefault.jpg" },
  { title: "Regrouping in Addition and Subtraction", url: "https://www.youtube.com/watch?v=tr7HwZirgHw", thumbnail: "https://img.youtube.com/vi/tr7HwZirgHw/maxresdefault.jpg" },
  { title: "Understanding Hundreds, Tens, and Ones", url: "https://www.youtube.com/watch?v=omkDLmfvetk", thumbnail: "https://img.youtube.com/vi/omkDLmfvetk/maxresdefault.jpg" },
  { title: "Comparing Numbers up to 1000", url: "https://www.youtube.com/watch?v=hLsnpcP8hu0", thumbnail: "https://img.youtube.com/vi/hLsnpcP8hu0/maxresdefault.jpg" },
  { title: "Introduction to Multiplication (Times Tables 1-5)", url: "https://www.youtube.com/watch?v=CFDCG1b4ahk", thumbnail: "https://img.youtube.com/vi/CFDCG1b4ahk/maxresdefault.jpg" },
  { title: "Introduction to Division", url: "https://www.youtube.com/watch?v=2muobEZUalE", thumbnail: "https://img.youtube.com/vi/2muobEZUalE/maxresdefault.jpg" },
  { title: "Multiplication and Division Facts", url: "https://www.youtube.com/watch?v=fr04p6Ar9ic", thumbnail: "https://img.youtube.com/vi/fr04p6Ar9ic/maxresdefault.jpg" },
  { title: "Measuring Length using Rulers (cm and inches)", url: "https://www.youtube.com/watch?v=Mw7Jzhy8YxI", thumbnail: "https://img.youtube.com/vi/Mw7Jzhy8YxI/maxresdefault.jpg" },
  { title: "Introduction to Weight (grams and kilograms)", url: "https://www.youtube.com/watch?v=ZCd_-8r517Q", thumbnail: "https://img.youtube.com/vi/ZCd_-8r517Q/maxresdefault.jpg" },
  { title: "Capacity and Volume (liters and milliliters)", url: "https://www.youtube.com/watch?v=GKCE8ohIBqE", thumbnail: "https://img.youtube.com/vi/GKCE8ohIBqE/maxresdefault.jpg" },
  { title: "Telling Time to the Nearest 5 Minutes", url: "https://www.youtube.com/watch?v=kIowQyLf7TM", thumbnail: "https://img.youtube.com/vi/kIowQyLf7TM/maxresdefault.jpg" },
  { title: "Elapsed Time", url: "https://www.youtube.com/watch?v=SPP6a9NDfY0", thumbnail: "https://img.youtube.com/vi/SPP6a9NDfY0/maxresdefault.jpg" },
  { title: "Counting Coins and Bills up to $1", url: "https://www.youtube.com/watch?v=BxrzwF6oV6s", thumbnail: "https://img.youtube.com/vi/BxrzwF6oV6s/maxresdefault.jpg" },
  { title: "Making Change", url: "https://www.youtube.com/watch?v=Z-4i_mlOSTM", thumbnail: "https://img.youtube.com/vi/Z-4i_mlOSTM/maxresdefault.jpg" },
  { title: "Identifying 2D and 3D Shapes", url: "https://www.youtube.com/watch?v=_4fJL_XinAY", thumbnail: "https://img.youtube.com/vi/_4fJL_XinAY/maxresdefault.jpg" },
  { title: "Simple Symmetry and Patterns", url: "https://www.youtube.com/watch?v=MtqtIiJsfiE", thumbnail: "https://img.youtube.com/vi/MtqtIiJsfiE/maxresdefault.jpg" },
];

const grade3Videos = [
  { title: "Multiplying Numbers up to 10x10", url: "https://www.youtube.com/watch?v=-QJjus-PeIc", thumbnail: "https://img.youtube.com/vi/-QJjus-PeIc/maxresdefault.jpg" },
  { title: "Division with Remainders", url: "https://www.youtube.com/watch?v=QlBzBcLIN2U", thumbnail: "https://img.youtube.com/vi/QlBzBcLIN2U/maxresdefault.jpg" },
  { title: "Word Problems with Multiplication and Division", url: "https://www.youtube.com/watch?v=i9iGu_gDOU0", thumbnail: "https://img.youtube.com/vi/i9iGu_gDOU0/maxresdefault.jpg" },
  { title: "Understanding Fractions (1/2, 1/3, 1/4)", url: "https://www.youtube.com/watch?v=CG-yfc8Mv5I", thumbnail: "https://img.youtube.com/vi/CG-yfc8Mv5I/maxresdefault.jpg" },
  { title: "Comparing and Ordering Fractions", url: "https://www.youtube.com/watch?v=nH7s9SIjwus", thumbnail: "https://img.youtube.com/vi/nH7s9SIjwus/maxresdefault.jpg" },
  { title: "Addition and Subtraction of Simple Fractions (Same Denominator)", url: "https://www.youtube.com/watch?v=rLCheqJh_rQ", thumbnail: "https://img.youtube.com/vi/rLCheqJh_rQ/maxresdefault.jpg" },
  { title: "Addition and Subtraction of Simple Fractions (Different Denominator)", url: "https://www.youtube.com/watch?v=XsW8HJutIgM", thumbnail: "https://img.youtube.com/vi/XsW8HJutIgM/maxresdefault.jpg" },
  { title: "Understanding Thousands, Hundreds, Tens, and Ones", url: "https://www.youtube.com/watch?v=QS32l5WhSuY", thumbnail: "https://img.youtube.com/vi/QS32l5WhSuY/maxresdefault.jpg" },
  { title: "Rounding Numbers", url: "https://www.youtube.com/watch?v=VPdE5aOH52g", thumbnail: "https://img.youtube.com/vi/VPdE5aOH52g/maxresdefault.jpg" },
  { title: "Telling Time to the Nearest Minute", url: "https://www.youtube.com/watch?v=8AmyE0lRjSU", thumbnail: "https://img.youtube.com/vi/8AmyE0lRjSU/maxresdefault.jpg" },
  { title: "Calculating Elapsed Time", url: "https://www.youtube.com/watch?v=zXFZUMjehDU", thumbnail: "https://img.youtube.com/vi/zXFZUMjehDU/maxresdefault.jpg" },
];

const grade4Videos = [
  { title: "Multiplying Multi-Digit Numbers", url: "https://www.youtube.com/watch?v=dNSrfoYLQZU", thumbnail: "https://img.youtube.com/vi/dNSrfoYLQZU/maxresdefault.jpg" },
  { title: "Division with Multi-Digit Numbers", url: "https://www.youtube.com/watch?v=j9y2uSvEj3I", thumbnail: "https://img.youtube.com/vi/j9y2uSvEj3I/maxresdefault.jpg" },
  { title: "Multiplication and Division Word Problems", url: "https://www.youtube.com/watch?v=i9iGu_gDOU0", thumbnail: "https://img.youtube.com/vi/i9iGu_gDOU0/maxresdefault.jpg" },
  { title: "Understanding and Comparing Fractions", url: "https://www.youtube.com/watch?v=6PIZ9P5aRWo", thumbnail: "https://img.youtube.com/vi/6PIZ9P5aRWo/maxresdefault.jpg" },
  { title: "Comparison of Fractions", url: "https://www.youtube.com/watch?v=cwZ528Ea63Y", thumbnail: "https://img.youtube.com/vi/cwZ528Ea63Y/maxresdefault.jpg" },
  { title: "Adding Fractions with the Same Denominator", url: "https://www.youtube.com/watch?v=rLCheqJh_rQ", thumbnail: "https://img.youtube.com/vi/rLCheqJh_rQ/maxresdefault.jpg" },
  { title: "Subtracting Fractions with the Same Denominator", url: "https://www.youtube.com/watch?v=Adr5sxiufkA", thumbnail: "https://img.youtube.com/vi/Adr5sxiufkA/maxresdefault.jpg" },
  { title: "Introduction to Decimals", url: "https://www.youtube.com/watch?v=KrAQneGhyuE", thumbnail: "https://img.youtube.com/vi/KrAQneGhyuE/maxresdefault.jpg" },
  { title: "Comparing Fractions", url: "https://www.youtube.com/watch?v=DI5q606sqj4", thumbnail: "https://img.youtube.com/vi/DI5q606sqj4/maxresdefault.jpg" },
  { title: "Comparing Decimals", url: "https://www.youtube.com/watch?v=DwgESLxWrQw", thumbnail: "https://img.youtube.com/vi/DwgESLxWrQw/maxresdefault.jpg" },
];

const grade5Videos = [
  { title: "Multiplying Multi-Digit Numbers", url: "https://www.youtube.com/watch?v=bD8MOgi5_hg", thumbnail: "https://img.youtube.com/vi/bD8MOgi5_hg/maxresdefault.jpg" },
  { title: "Long Division and Division with Remainders", url: "https://www.youtube.com/watch?v=6Ij98BwDcOg", thumbnail: "https://img.youtube.com/vi/6Ij98BwDcOg/maxresdefault.jpg" },
  { title: "Solving Word Problems with Large Numbers", url: "https://www.youtube.com/watch?v=D_xg4LA1EcI", thumbnail: "https://img.youtube.com/vi/D_xg4LA1EcI/maxresdefault.jpg" },
  { title: "Adding and Subtracting Fractions with Unlike Denominators", url: "https://www.youtube.com/watch?v=XsW8HJutIgM", thumbnail: "https://img.youtube.com/vi/XsW8HJutIgM/maxresdefault.jpg" },
  { title: "Multiplying Fractions and Whole Numbers", url: "https://www.youtube.com/watch?v=B8LVDxQB_LQ", thumbnail: "https://img.youtube.com/vi/B8LVDxQB_LQ/maxresdefault.jpg" },
  { title: "Converting Between Fractions, Decimals, and Percentages", url: "https://www.youtube.com/watch?v=-Xt4UDk7Kzw", thumbnail: "https://img.youtube.com/vi/-Xt4UDk7Kzw/maxresdefault.jpg" },
  { title: "Percentages", url: "https://www.youtube.com/watch?v=KewfKIXRRtI", thumbnail: "https://img.youtube.com/vi/KewfKIXRRtI/maxresdefault.jpg" },
  { title: "Understanding Decimal Place Value", url: "https://www.youtube.com/watch?v=fxCXHQBUidU", thumbnail: "https://img.youtube.com/vi/fxCXHQBUidU/maxresdefault.jpg" },
  { title: "Rounding Decimals and Whole Numbers", url: "https://www.youtube.com/watch?v=zIwF6xQ3L_c", thumbnail: "https://img.youtube.com/vi/zIwF6xQ3L_c/maxresdefault.jpg" },
  { title: "Estimating and Checking Answers", url: "https://www.youtube.com/watch?v=EvQf38lnAJc", thumbnail: "https://img.youtube.com/vi/EvQf38lnAJc/maxresdefault.jpg" },
  { title: "Units of Volume", url: "https://www.youtube.com/watch?v=HuwKlGpzqB8", thumbnail: "https://img.youtube.com/vi/HuwKlGpzqB8/maxresdefault.jpg" },
  { title: "Area and Perimeter of Shapes", url: "https://www.youtube.com/watch?v=FTBQ0MdLbFo", thumbnail: "https://img.youtube.com/vi/FTBQ0MdLbFo/maxresdefault.jpg" },
  { title: "Volume of 3D Shapes - Cubes", url: "https://www.youtube.com/watch?v=RxkRlIAucMk", thumbnail: "https://img.youtube.com/vi/RxkRlIAucMk/maxresdefault.jpg" },
  { title: "Volume of 3D Shapes - Rectangular Prisms", url: "https://www.youtube.com/watch?v=BAa0N9vvD0s", thumbnail: "https://img.youtube.com/vi/BAa0N9vvD0s/maxresdefault.jpg" },
  { title: "Identifying and Classifying 3D Shapes", url: "https://www.youtube.com/watch?v=eVDqk-39TZQ", thumbnail: "https://img.youtube.com/vi/eVDqk-39TZQ/maxresdefault.jpg" },
  { title: "Properties of Angles (Acute, Right, Obtuse)", url: "https://www.youtube.com/watch?v=9RTM418qfdI", thumbnail: "https://img.youtube.com/vi/9RTM418qfdI/maxresdefault.jpg" },
  { title: "Symmetry and Transformations (Translations, Rotations)", url: "https://www.youtube.com/watch?v=no9Drfcw2Zo", thumbnail: "https://img.youtube.com/vi/no9Drfcw2Zo/maxresdefault.jpg" },
  { title: "Mean, Median, Mode, and Range", url: "https://www.youtube.com/watch?v=OPaFre12j10", thumbnail: "https://img.youtube.com/vi/OPaFre12j10/maxresdefault.jpg" },
  { title: "Probability Concepts (Likely, Unlikely, Impossible Events)", url: "https://www.youtube.com/watch?v=lYXDQ5-I7Qk", thumbnail: "https://img.youtube.com/vi/lYXDQ5-I7Qk/maxresdefault.jpg" },
  { title: "Representing Data on Graphs and Tables", url: "https://www.youtube.com/watch?v=2a5OuENTZUg", thumbnail: "https://img.youtube.com/vi/2a5OuENTZUg/maxresdefault.jpg" },
  { title: "Basic Algebraic Expressions", url: "https://www.youtube.com/watch?v=k-KiWkV81fQ", thumbnail: "https://img.youtube.com/vi/k-KiWkV81fQ/maxresdefault.jpg" },
  { title: "Patterns and Sequences", url: "https://www.youtube.com/watch?v=BNz3Kjsv6K4", thumbnail: "https://img.youtube.com/vi/BNz3Kjsv6K4/maxresdefault.jpg" },
  { title: "Solving for an Unknown Using Simple Equations", url: "https://www.youtube.com/watch?v=P9AFd3hwxiQ", thumbnail: "https://img.youtube.com/vi/P9AFd3hwxiQ/maxresdefault.jpg" },
];

export default function MathPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="math-page">
    <Navbar /> 
      {/* Video player modal */}
      {selectedVideo && (
        <VideoPlayer url={selectedVideo.url} onClose={handleClosePlayer} />
      )}

      {/* Grade sections */}
      <VideoSection
        grade="1"
        videos={grade1Videos}
        onVideoClick={handleVideoSelect}
      />
      <VideoSection
        grade="2"
        videos={grade2Videos}
        onVideoClick={handleVideoSelect}
      />
      <VideoSection
        grade="3"
        videos={grade3Videos}
        onVideoClick={handleVideoSelect}
      />
      <VideoSection
        grade="4"
        videos={grade4Videos}
        onVideoClick={handleVideoSelect}
      />
      <VideoSection
        grade="5"
        videos={grade5Videos}
        onVideoClick={handleVideoSelect}
      />
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