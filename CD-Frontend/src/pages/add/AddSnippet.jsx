import { useState } from 'react';
import axiosInstance from '../../utils/Axios';
import './index.css';

function AddSnippet() {
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');
  const [keywords, setKeywords] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || !language || !keywords) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axiosInstance.post('/snippets/addsnippet', {
        content,
        language,
        keywords,
      });

      if (response.data.success) {
        setSuccessMessage('Snippet added successfully!');
        setContent('');
        setLanguage('');
        setKeywords('');
      } else {
        setErrorMessage('Error adding snippet.');
      }
    } catch (err) {
      console.error('Error adding snippet:', err);
      setErrorMessage('Error adding snippet.');
    }
  };

  return (
    <div className="add-snippet-container">
      <h1 className="page-title">Add New Snippet</h1>
      <form onSubmit={handleSubmit} className="add-snippet-form">
        <div className="form-group">
          <label htmlFor="content">Snippet Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your snippet content"
            rows="6"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Enter Programming language"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="keywords">Keywords</label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords"
            className="form-input"
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="submit-button">
          Add Snippet
        </button>
      </form>
    </div>
  );
}

export default AddSnippet;
