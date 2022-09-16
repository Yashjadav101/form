import React, { useState } from "react";

function Form2() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const re =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;
case "email":
  if (!value) {
    stateObj[name] = "please enter a email";
  } else if (!re.test(input.email)) {
    stateObj[name] = "please enter valid email";
  }
  break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <div className="Login">
      <form>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={input.username}
          onChange={onInputChange}
          onBlur={validateInput}
        ></input>
        {error.username && <span className="err">{error.username}</span>}
<input 
 type="text"
 name="email"
 placeholder="Enter Email"
 value={input.email}
 onChange={onInputChange}
 onBlur={validateInput}
></input>
{error.email && <span className="err">{error.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}
        ></input>
        {error.password && <span className="err">{error.password}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}
        ></input>
        {error.confirmPassword && (
          <span className="err">{error.confirmPassword}</span>
        )}

        <button onSubmit={(e)=>{e.preventDefault()}}>Submit</button>
      </form>
    </div>
  );
}

export default Form2;
