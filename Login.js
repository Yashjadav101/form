import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [issubmitted, setSubmitted] = useState(false);
  const { username, email, password, confirmpassword } = user;

  const validation = (values) => {
    let errors = {};
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.username) {
      errors.username = "please enter a name";
    }
    if (!values.email) {
      errors.email = "please enter a email";
    } else if (!re.test(values.email)) {
      errors.email = "please enter valid email";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length< 4) {
      errors.password = "password more than 4 characte";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "confirmpassword is Required";
    } else if (values.confirmpassword.length < 4) {
      errors.confirmpassword = " c Password more than 4 character";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Password is Not Match";
    }
    return errors;
  };

  const reset = () => {
    setUser({ username: "", email: "", password: "", confirmpassword: "" });
  };

  const handlechange = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: validation({ [e.target.name]:e.target.value })[
        e.target.name
      ],
    });
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(user));
    console.log("user", user);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          UserName:
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter UserName"
            onChange={handlechange}
          />
        </div>
        {errors && errors.username && (
          <small style={{ color: "red" }}>{errors.username}</small>
        )}
        <div>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handlechange}
          />
        </div>
        {errors && errors.email && (
          <small style={{ color: "red" }}>{errors.email}</small>
        )}

        <div>
          Password:
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={handlechange}
          />
        </div>
        {errors && errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}

        <div>
          Confirm password:
          <input
            type="text"
            name="confirmpassword"
            value={confirmpassword}
            placeholder="Enter password"
            onChange={handlechange}
          />
        </div>
        {errors && errors.confirmpassword && (
          <small style={{ color: "red" }}>{errors.confirmpassword}</small>
        )}

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
