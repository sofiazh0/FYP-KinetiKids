import React, { useState } from 'react';
import './EnglishPage.css';
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
    { title: "Blending Sounds to Form Words", url: "https://www.youtube.com/watch?v=pQgJnpE7IL8", thumbnail: "https://img.youtube.com/vi/pQgJnpE7IL8/maxresdefault.jpg" },
    { title: "Spelling Common Words with Consonant-Vowel Patterns", url: "https://www.youtube.com/watch?v=qRVUULcS_xU", thumbnail: "https://img.youtube.com/vi/qRVUULcS_xU/maxresdefault.jpg" },
    { title: "Rhyming Words", url: "https://www.youtube.com/watch?v=vAElDlL_ofQ", thumbnail: "https://img.youtube.com/vi/vAElDlL_ofQ/maxresdefault.jpg" },
  
    // Sentence Structure
    { title: "Adjectives", url: "https://www.youtube.com/watch?v=ySF86NfIV9Q", thumbnail: "https://img.youtube.com/vi/ySF86NfIV9Q/maxresdefault.jpg" },
    { title: "Expanding Sentences", url: "https://www.youtube.com/watch?v=cncjgI30au0", thumbnail: "https://img.youtube.com/vi/cncjgI30au0/maxresdefault.jpg" },
    { title: "Simple Compound Sentences", url: "https://www.youtube.com/watch?v=5o1Qg_zTyaw", thumbnail: "https://img.youtube.com/vi/5o1Qg_zTyaw/maxresdefault.jpg" },
  
    // Vocabulary Development
    { title: "More Complex Vocabulary Words", url: "https://www.youtube.com/watch?v=7uY2HrQ9qQ8", thumbnail: "https://img.youtube.com/vi/7uY2HrQ9qQ8/maxresdefault.jpg" },
    { title: "Synonyms and Antonyms", url: "https://www.youtube.com/watch?v=PDI2xlOBcM4", thumbnail: "https://img.youtube.com/vi/PDI2xlOBcM4/maxresdefault.jpg" },
    { title: "Vocabulary", url: "https://www.youtube.com/watch?v=6GMAugzV5ls", thumbnail: "https://img.youtube.com/vi/6GMAugzV5ls/maxresdefault.jpg" },
  
    // Reading Comprehension
    { title: "Understanding Short Paragraphs", url: "https://www.youtube.com/watch?v=keBFpEdiVVU", thumbnail: "https://img.youtube.com/vi/keBFpEdiVVU/maxresdefault.jpg" },
    { title: "Main Idea and Details", url: "https://www.youtube.com/watch?v=LbO3lRXT0ww", thumbnail: "https://img.youtube.com/vi/LbO3lRXT0ww/maxresdefault.jpg" },
    { title: "Sequencing Events in a Story", url: "https://www.youtube.com/watch?v=4AMptAmS_xM", thumbnail: "https://img.youtube.com/vi/4AMptAmS_xM/maxresdefault.jpg" },
  
    // Writing Skills
    { title: "Writing a Short Paragraph with a Topic Sentence", url: "https://www.youtube.com/watch?v=vPQySmjZP7c", thumbnail: "https://img.youtube.com/vi/vPQySmjZP7c/maxresdefault.jpg" },
    { title: "Writing About Personal Experiences or Events", url: "https://www.youtube.com/watch?v=z0uXjL2IdeU", thumbnail: "https://img.youtube.com/vi/z0uXjL2IdeU/maxresdefault.jpg" },
    { title: "Using Descriptive Words in Writing", url: "https://www.youtube.com/watch?v=m_QkDFf-Hu8", thumbnail: "https://img.youtube.com/vi/m_QkDFf-Hu8/maxresdefault.jpg" },
  
    // Grammar
    { title: "Nouns (Common, Proper)", url: "https://www.youtube.com/watch?v=gQsZr8yrsno", thumbnail: "https://img.youtube.com/vi/gQsZr8yrsno/maxresdefault.jpg" },
    { title: "Nouns (Singular, Plural)", url: "https://www.youtube.com/watch?v=L4B7XxuJO6A", thumbnail: "https://img.youtube.com/vi/L4B7XxuJO6A/maxresdefault.jpg" },
    { title: "Verbs (Action Words)", url: "https://www.youtube.com/watch?v=pn5IIdQa49w", thumbnail: "https://img.youtube.com/vi/pn5IIdQa49w/maxresdefault.jpg" },
    { title: "Verbs (Tenses)", url: "https://www.youtube.com/watch?v=sCiG6rlk2Bc", thumbnail: "https://img.youtube.com/vi/sCiG6rlk2Bc/maxresdefault.jpg" },
    { title: "Simple Punctuation (Periods, Question Marks, Exclamation Points)", url: "https://www.youtube.com/watch?v=RPL8iij1X2A", thumbnail: "https://img.youtube.com/vi/RPL8iij1X2A/maxresdefault.jpg" },
  ];
  

  const grade3Videos = [
    // Phonics and Spelling
    { title: "Long and Short Vowel Sounds", url: "https://www.youtube.com/watch?v=4TjcT7Gto3U", thumbnail: "https://img.youtube.com/vi/4TjcT7Gto3U/maxresdefault.jpg" },
    { title: "Consonant Blends and Digraphs", url: "https://www.youtube.com/watch?v=ScCrD5eW1_U", thumbnail: "https://img.youtube.com/vi/ScCrD5eW1_U/maxresdefault.jpg" },
    { title: "Compound Words", url: "https://www.youtube.com/watch?v=JUpt0fi9kws", thumbnail: "https://img.youtube.com/vi/JUpt0fi9kws/maxresdefault.jpg" },
  
    // Sentence Structure
    { title: "Parts of Speech (Nouns, Verbs, Adjectives, Pronouns)", url: "https://www.youtube.com/watch?v=7zRih61HCZs", thumbnail: "https://img.youtube.com/vi/7zRih61HCZs/maxresdefault.jpg" },
    { title: "Compound and Complex Sentences", url: "https://www.youtube.com/watch?v=smgyeUomfyA", thumbnail: "https://img.youtube.com/vi/smgyeUomfyA/maxresdefault.jpg" },
    { title: "Subject-Verb Agreement", url: "https://www.youtube.com/watch?v=KI6jX40WM3w", thumbnail: "https://img.youtube.com/vi/KI6jX40WM3w/maxresdefault.jpg" },
  
    // Comprehension Skills
    { title: "Comprehension Skills", url: "https://www.youtube.com/watch?v=W7BW9gv_OkU", thumbnail: "https://img.youtube.com/vi/W7BW9gv_OkU/maxresdefault.jpg" },
    { title: "Identifying the Plot, Characters, and Setting", url: "https://www.youtube.com/watch?v=s-QB58egsK4", thumbnail: "https://img.youtube.com/vi/s-QB58egsK4/maxresdefault.jpg" },
    { title: "Making Inferences and Predictions", url: "https://www.youtube.com/watch?v=g2G-MaIxjBI", thumbnail: "https://img.youtube.com/vi/g2G-MaIxjBI/maxresdefault.jpg" },
  
    // Writing Skills
    { title: "Writing Detailed Paragraphs with Supporting Sentences", url: "https://www.youtube.com/watch?v=p_jWfaMdh7A", thumbnail: "https://img.youtube.com/vi/p_jWfaMdh7A/maxresdefault.jpg" },
    { title: "Narrative Writing (Stories)", url: "https://www.youtube.com/watch?v=98SsUs0mQyA", thumbnail: "https://img.youtube.com/vi/98SsUs0mQyA/maxresdefault.jpg" },
    { title: "Opinion Writing (Stating and Supporting Opinions)", url: "https://www.youtube.com/watch?v=KEK2oGBSsHk", thumbnail: "https://img.youtube.com/vi/KEK2oGBSsHk/maxresdefault.jpg" },
  
    // Vocabulary Development
    { title: "Context Clues to Determine Word Meaning", url: "https://www.youtube.com/watch?v=eHCpJ86XDY4", thumbnail: "https://img.youtube.com/vi/eHCpJ86XDY4/maxresdefault.jpg" },
    { title: "Homophones and Homonyms", url: "https://www.youtube.com/watch?v=f_7FR59AKmQ", thumbnail: "https://img.youtube.com/vi/f_7FR59AKmQ/maxresdefault.jpg" },
    { title: "Learning Words from Context in a Story", url: "https://www.youtube.com/watch?v=CiNggzdWkIo", thumbnail: "https://img.youtube.com/vi/CiNggzdWkIo/maxresdefault.jpg" },
  
    { title: "Commonly Misspelled Words", url: "https://www.youtube.com/watch?v=hm63sNXBy5o", thumbnail: "https://img.youtube.com/vi/hm63sNXBy5o/maxresdefault.jpg" },
    { title: "Using Commas, Quotation Marks, and Apostrophes Correctly", url: "https://www.youtube.com/watch?v=yqp9fdv1pT8", thumbnail: "https://img.youtube.com/vi/yqp9fdv1pT8/maxresdefault.jpg" },
  ];
  

  const grade4Videos = [
    // Advanced Vocabulary Development
    { title: "Expanding Vocabulary (Synonyms, Antonyms)", url: "https://www.youtube.com/watch?v=-mLRoxWM8dI", thumbnail: "https://img.youtube.com/vi/-mLRoxWM8dI/maxresdefault.jpg" },
    { title: "Expanding Vocabulary (Homophones)", url: "https://www.youtube.com/watch?v=upRY6RP10JA", thumbnail: "https://img.youtube.com/vi/upRY6RP10JA/maxresdefault.jpg" },
    { title: "Figurative Language (Similes, Metaphors)", url: "https://www.youtube.com/watch?v=sXGhtKJym1U", thumbnail: "https://img.youtube.com/vi/sXGhtKJym1U/maxresdefault.jpg" },
    { title: "Understanding Word Roots and Prefixes", url: "https://www.youtube.com/watch?v=yRwmr7CqnrY", thumbnail: "https://img.youtube.com/vi/yRwmr7CqnrY/maxresdefault.jpg" },
  
    // Reading Comprehension
    { title: "Analyzing Longer Texts and Paragraphs", url: "https://www.youtube.com/watch?v=zwqOYvASrps", thumbnail: "https://img.youtube.com/vi/zwqOYvASrps/maxresdefault.jpg" },
    { title: "Summarizing Main Points and Supporting Details", url: "https://www.youtube.com/watch?v=LWFnpeimPfE", thumbnail: "https://img.youtube.com/vi/LWFnpeimPfE/maxresdefault.jpg" },
    { title: "Comparing and Contrasting Information in Texts", url: "https://www.youtube.com/watch?v=3MARlXkg4Zg", thumbnail: "https://img.youtube.com/vi/3MARlXkg4Zg/maxresdefault.jpg" },
  
    // Writing Skills
    { title: "Writing Essays with a Clear Introduction, Body, and Conclusion", url: "https://www.youtube.com/watch?v=m59irsRj3NU", thumbnail: "https://img.youtube.com/vi/m59irsRj3NU/maxresdefault.jpg" },
    { title: "Writing Narratives with Clear Sequencing and Details", url: "https://www.youtube.com/watch?v=98SsUs0mQyA", thumbnail: "https://img.youtube.com/vi/98SsUs0mQyA/maxresdefault.jpg" },
    { title: "Writing Persuasive Texts with Reasons and Evidence", url: "https://www.youtube.com/watch?v=1DltMnjPr1k", thumbnail: "https://img.youtube.com/vi/1DltMnjPr1k/maxresdefault.jpg" },
  
    // Grammar
    { title: "Verb Tenses (Past, Present, Future)", url: "https://www.youtube.com/watch?v=4Rm9l6y3-WY", thumbnail: "https://img.youtube.com/vi/4Rm9l6y3-WY/maxresdefault.jpg" },
    { title: "Prepositions, Conjunctions, and Interjections", url: "https://www.youtube.com/watch?v=EtSelS3YeLI", thumbnail: "https://img.youtube.com/vi/EtSelS3YeLI/maxresdefault.jpg" },
    { title: "Direct and Indirect Speech", url: "https://www.youtube.com/watch?v=ryIHmwK6Ots", thumbnail: "https://img.youtube.com/vi/ryIHmwK6Ots/maxresdefault.jpg" },
  
    // Sentence Structure
    { title: "Complex and Compound Sentences", url: "https://www.youtube.com/watch?v=fgeIRVE_WUk", thumbnail: "https://img.youtube.com/vi/fgeIRVE_WUk/maxresdefault.jpg" },
    { title: "Identifying and Correcting Sentence Fragments and Run-On Sentences", url: "https://www.youtube.com/watch?v=GJZzAaexLd4", thumbnail: "https://img.youtube.com/vi/GJZzAaexLd4/maxresdefault.jpg" },
    { title: "Using Transitional Words (First, Next, Finally, etc.)", url: "https://www.youtube.com/watch?v=sFrHK7cHzkA", thumbnail: "https://img.youtube.com/vi/sFrHK7cHzkA/maxresdefault.jpg" },
  
    // Spelling and Punctuation
    { title: "Spelling Strategies (Using Prefixes, Suffixes)", url: "https://www.youtube.com/watch?v=yRwmr7CqnrY", thumbnail: "https://img.youtube.com/vi/yRwmr7CqnrY/maxresdefault.jpg" },
    { title: "Correct Use of Commas, Quotation Marks, Apostrophes, and Colons", url: "https://www.youtube.com/watch?v=zVu-XvULZNg", thumbnail: "https://img.youtube.com/vi/zVu-XvULZNg/maxresdefault.jpg" },
  ];
  

  const grade5Videos = [
    // Vocabulary Development
    { title: "Learning Idiomatic Expressions and Phrasal Verbs", url: "https://www.youtube.com/watch?v=IhDYDpvC0YM", thumbnail: "https://img.youtube.com/vi/IhDYDpvC0YM/maxresdefault.jpg" },
    { title: "Word Families and Root Words", url: "https://www.youtube.com/watch?v=hzHUjXN4EfU", thumbnail: "https://img.youtube.com/vi/hzHUjXN4EfU/maxresdefault.jpg" },
    { title: "Homophones, Homonyms, and Synonyms", url: "https://www.youtube.com/watch?v=f_7FR59AKmQ", thumbnail: "https://img.youtube.com/vi/f_7FR59AKmQ/maxresdefault.jpg" },
  
    // Reading Comprehension
    { title: "Analyzing Main Ideas", url: "https://www.youtube.com/watch?v=LbO3lRXT0ww", thumbnail: "https://img.youtube.com/vi/LbO3lRXT0ww/maxresdefault.jpg" },
    { title: "Character Development and Motivation", url: "https://www.youtube.com/watch?v=LbO3lRXT0ww", thumbnail: "https://img.youtube.com/vi/LbO3lRXT0ww/maxresdefault.jpg" },
    { title: "Drawing Conclusions Based on Evidence in the Text", url: "https://www.youtube.com/watch?v=jJ89jzn6dhc", thumbnail: "https://img.youtube.com/vi/jJ89jzn6dhc/maxresdefault.jpg" },
  
    // Writing Skills
    { title: "Writing Detailed Reports", url: "https://www.youtube.com/watch?v=T3CZe5Rj_bI", thumbnail: "https://img.youtube.com/vi/T3CZe5Rj_bI/maxresdefault.jpg" },
    { title: "Writing Persuasive Essays", url: "https://www.youtube.com/watch?v=PpeHRFIk7IY", thumbnail: "https://img.youtube.com/vi/PpeHRFIk7IY/maxresdefault.jpg" },
    { title: "Writing Narratives with a Focus on Character Development, Plot, and Setting", url: "https://www.youtube.com/watch?v=RSoRzTtwgP4", thumbnail: "https://img.youtube.com/vi/RSoRzTtwgP4/maxresdefault.jpg" },
  
    // Grammar and Sentence Structure
    { title: "Advanced Sentence Structures", url: "https://www.youtube.com/watch?v=eFmfoeTkhH0", thumbnail: "https://img.youtube.com/vi/eFmfoeTkhH0/maxresdefault.jpg" },
    { title: "Active and Passive Voice", url: "https://www.youtube.com/watch?v=4xS2BgkjsFg", thumbnail: "https://img.youtube.com/vi/4xS2BgkjsFg/maxresdefault.jpg" },
    { title: "Modal Verbs (Can, Should, Must, etc.)", url: "https://www.youtube.com/watch?v=hp9T-7on2Ow", thumbnail: "https://img.youtube.com/vi/hp9T-7on2Ow/maxresdefault.jpg" },
  
    // Literary Devices and Analysis
    { title: "Symbolism and Figurative Language in Texts", url: "https://www.youtube.com/watch?v=YlfzDvrhzuU", thumbnail: "https://img.youtube.com/vi/YlfzDvrhzuU/maxresdefault.jpg" },
    { title: "Comparing Different Genres (Fiction, Non-fiction, Poetry)", url: "https://www.youtube.com/watch?v=QrUPneyZNf0", thumbnail: "https://img.youtube.com/vi/QrUPneyZNf0/maxresdefault.jpg" },
    { title: "Writing Book Reports and Reviews", url: "https://www.youtube.com/watch?v=IhYF3v3zTeo", thumbnail: "https://img.youtube.com/vi/IhYF3v3zTeo/maxresdefault.jpg" },
  
    // Punctuation and Proofreading
    { title: "Using Commas, Semi-Colons, Colons, and Dashes Correctly", url: "https://www.youtube.com/watch?v=XiZztBIqWMk", thumbnail: "https://img.youtube.com/vi/XiZztBIqWMk/maxresdefault.jpg" },
    { title: "Proofreading for Errors in Spelling, Grammar, and Punctuation", url: "https://www.youtube.com/watch?v=izENvJJY6Hg", thumbnail: "https://img.youtube.com/vi/izENvJJY6Hg/maxresdefault.jpg" },
    { title: "Using Complex Sentences and Clauses to Convey Meaning More Effectively", url: "https://www.youtube.com/watch?v=FRp5Ufi2t0k", thumbnail: "https://img.youtube.com/vi/FRp5Ufi2t0k/maxresdefault.jpg" }
  ];
  

export default function EnglishPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="english-page">
      {/* In-app video modal */}
      {selectedVideo && (
        <VideoPlayer url={selectedVideo.url} onClose={handleClosePlayer} />
      )}

      {/* All Grade Sections */}
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