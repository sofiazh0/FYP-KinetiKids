import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [queryText, setQueryText] = useState('');
  const [response, setResponse] = useState('');
  const [pdfFile, setPdfFile] = useState(null); // State to handle PDF file upload

  // Function to handle PDF file change
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]); // Set the uploaded PDF file
  };

  // Function to process query text and optional PDF
  const handleQuerySubmit = async () => {
    if (pdfFile) {
      try {
        // Create form data to send the PDF to the backend
        const formData = new FormData();
        formData.append('file', pdfFile);

        // Send the PDF to the backend for text extraction
        const pdfResponse = await axios.post('http://localhost:8000/process_pdf_query/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const extractedText = pdfResponse.data.text; // Get extracted text from the backend

        // Now send the extracted text along with the query to the backend for processing
        const queryResponse = await axios.post('http://localhost:8000/process_query/', {
          text: extractedText,
          query_text: queryText,
        });

        setResponse(queryResponse.data.response); // Display the chatbot response
      } catch (error) {
        console.error('Error processing PDF:', error);
      }
    } else {
      // If no PDF is uploaded, just process the query text
      try {
        const queryResponse = await axios.post('http://localhost:8000/process_query/', {
          text: '', // No text if PDF isn't uploaded
          query_text: queryText,
        });

        setResponse(queryResponse.data.response); // Display the chatbot response
      } catch (error) {
        console.error('Error processing query:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Chatbot with PDF Upload Support</h1>

      <div>
        <label>Upload PDF (optional): </label>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>

      <div>
        <label>Enter your query:</label>
        <input
          type="text"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Ask your question..."
        />
      </div>

      <button onClick={handleQuerySubmit}>Submit Query</button>

      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
