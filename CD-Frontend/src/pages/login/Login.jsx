import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/Axios';
import './index.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axiosInstance.post("/login", formData)
    const validationErrors = validateForm();
    if(response.data.status){
      console.log("success", response.data.authorisation.token)
      localStorage.setItem("token", response.data.authorisation.token)
      navigate('/snippets');
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Login Data:', formData);
      setErrors({});
    }
  };

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="title">Log In</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-footer">
          <button type="submit" className="login-button">Log In</button>
          <span className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
