import { useState } from 'react';
import { Link } from 'react-router-dom'
import './index.css';
import axiosInstance from '../../utils/Axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    full_name: '',
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
    if (!formData.full_name) newErrors.full_name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post("/signup", formData)
    console.log("this is it: ",response.data)
    const validationErrors = validateForm();
    if(response.data.status){
      console.log("success", response.data.user.token)
      localStorage.setItem("token", response.data.user.token)
      navigate('/snippets');
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Signup Data:', formData);
      setErrors({});
    }
  };

  return (
    <>
    <div className="container-signup">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className='title'>Sign Up</h2>
        <div className="form-group">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
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
          <button type="submit" className="signup-button">Sign Up</button>
          <span className="login-text">Already have an account? <Link to="/login">Log in</Link></span>
        </div>
      </form>
    </div>
    </>
  );
}

export default Signup;
