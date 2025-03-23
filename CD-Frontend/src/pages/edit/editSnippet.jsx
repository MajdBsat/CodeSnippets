import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/Axios";
import "./index.css";

function EditSnippet() {
  const location = useLocation();
  const navigate = useNavigate();
  const snippet = location.state;
    console.log("edit page: ", snippet)
  const [content, setContent] = useState(snippet?.content || "");
  const [language, setLanguage] = useState(snippet?.language || "");
  const [keywords, setKeywords] = useState(snippet?.keywords || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || !language || !keywords) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axiosInstance.post("/snippets/editsnippet", {
        id: snippet.id,
        content,
        language,
        keywords,
      });

      if (response.data.success) {
        setSuccessMessage("Snippet updated successfully!");
        setTimeout(() => navigate("/snippets"), 2000);
      } else {
        setErrorMessage("Error updating snippet.");
      }
    } catch (err) {
      console.error("Error updating snippet: ", err);
      setErrorMessage("Error updating snippet.");
    }
  };

  return (
    <div className="edit-snippet-container">
      <h1>Edit Snippet</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="edit-snippet-form">
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
            placeholder="Enter language (e.g., JavaScript)"
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
            placeholder="Enter keywords (e.g., loop, function)"
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Update Snippet
        </button>
      </form>
    </div>
  );
}

export default EditSnippet;
