import { useState, useEffect } from "react";
import "./index.css";
import axiosInstance from '../../utils/Axios';
import { useNavigate,Link } from 'react-router-dom'

function SnippetsPage() {
    const [snippets, setSnippets] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchSnippets = async () => {
          try {
            const response = await axiosInstance.get("/usersnippets");
            console.log("Fetched snippets: ", response.data.data);
            setSnippets(response.data.data);
          } catch (err) {
            console.error("Error fetching snippets: ", err);
          }
        };
    
        fetchSnippets();
      }, []); 

      

      const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this snippet?");
        if (confirmDelete) {
        try {
            const response = await axiosInstance.delete(`/snippets/deletesnippet/${id}`);
            if(response.data.success){
                setSnippets(snippets.filter((snippet) => snippet.id !== id));
                console.log(`Snippet with ID ${id} deleted successfully`);
                }
            } catch (err) {
            console.error("Error deleting snippet: ", err);
            }
        }else{
            console.log("Snippet deletion canceled");
        }
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setSnippets([]);
        navigate("/login");
    };

    const handleEdit = (snippet) => {
        navigate(`/editsnippet`, { state: snippet });
      };

      const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="title">mySnippets</h1>
        <input
          type="text"
          placeholder="Search snippets..."
          className="search-bar"
          value={search}
          onChange={handleSearchChange}
        />
        <div className="buttons">
        <Link to="/addsnippet">
            <button className="add-snippet">Add Snippet</button>
        </Link>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="snippets-list">
        {snippets?.length > 0 &&
        snippets?.filter((snippet) =>
            snippet.content?.toLowerCase().includes(search) ||
            snippet.keywords?.toLowerCase().includes(search) ||
            snippet.language?.toLowerCase().includes(search) ||
            snippet.language?.toUpperCase().includes(search) ||
            snippet.language?.toUpperCase().includes(search) ||
            snippet.language?.toUpperCase().includes(search)
          )
          .map((snippet) => (
            <div key={snippet.id} className="snippet-card">
              <div className="card-content">
                <pre className="code-block">
                  <code>{snippet.content}</code>
                </pre>
                <p className="snippet-info">Language: {snippet.language}</p>
                <p className="snippet-info">Keywords: {snippet.keywords}</p>
              </div>
              <div className="snippet-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(snippet)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(snippet.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SnippetsPage;
