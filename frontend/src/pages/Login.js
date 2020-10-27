import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import Context from "../context";

const Login = () => {
  const { login } = useContext(Context);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    login({ email, password });

    history.push("/");
  };

  return (
    <div className="login">
      <div className="form">
        <p className="title">Login</p>

        <form onSubmit={onSubmit}>
          <div className="form-input">
            <i className="fas fa-at"></i>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-input">
            <i className="fas fa-lock"></i>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="checkbox justify-content-center">
            <input id="remember_password" type="checkbox" />
            <label
              htmlFor="remember_password"
              className="remember_password_label"
            >
              {" "}
              Ricorda password
            </label>
          </div>
          <button className="d-block mx-auto mb-4" type="submit">
            Login
          </button>
        </form>

        <p className="firstaccess" onClick={() => history.push("/signup")}>
          Primo accesso? Registrati <span>qui</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
