import React, { useState, useContext } from "react";
import {useNavigate, Link } from "react-router-dom";
import userContext from "../context/users/UserContext";

export default function SignUp(props) {
  const context = useContext(userContext);
  const { SignUpUser } = context;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await SignUpUser(formData.name, formData.email, formData.password);
    if (user.error){
      return props.showAlert(user.msg,'danger');
    }
    props.showAlert(user.msg,'success');
    navigate('/login');
    
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center min-vh-80">
      <div className="card my-3 col-md-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center m-4">New User</h1>
        <div className="col-md-9 mx-auto">
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor="name">
              User Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              min = {3}
              required
            />
          </div>
        

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              min={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4" disabled={formData.password<5}>
            Sign in
          </button>

          <div className="text-center">
            <p>
              Already a member ? <Link to="/login"> Sign In</Link>
            </p>
          </div>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}
