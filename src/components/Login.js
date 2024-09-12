import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/users/UserContext";

export default function Login(props) {
  const context = useContext(userContext);
  const { loginUser } = context;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(formData.email, formData.password);
    // Handle form submission
    if (user.token) {
      localStorage.setItem("user", user.user);
      localStorage.setItem("auth-token", user.token);
      navigate("/");
      props.showAlert(user.msg, "success");
    } else props.showAlert(user.msg, "danger");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center min-vh-80">
        <div className="card my-3 col-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center m-4">Login User</h1>
            <div className="col-md-9 mx-auto">
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
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>

              <div className="text-center mb-3">
                <p>
                  Not a member? <Link to="/signup">SignUp</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
