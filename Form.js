import React, { useState, useEffect } from "react";

const data = {
  state: [
    { name: "gujarat", cities: ["ahmedabad", "surat", "rajkot"] },
    { name: "maharashtra", cities: ["mumbai", "pune", "thane"] },
    { name: "rajashthan", cities: ["jaipur", "jodhpur", "udaipur"] },
  ],
};

const Form = () => {
  const [item, setItem] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    hobbies: [],
    state: "",
    cities: "",
  });
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [validation, setValidation] = useState({});

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!item["name"]) {
      formIsValid = false;
      errors.name = "please enter a name";
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (item.email === "") {
      formIsValid = false;
      errors.email = "please enter email";
    } else if (!re.test(item.email)) {
      formIsValid = false;
      errors.email = "please enter valid email";
    }

    if (item.age === "") {
      formIsValid = false;
      errors.age = "please enter a valid age";
    }
    if (item.gender === "") {
      formIsValid = false;
      errors.gender = "please enter a valid gender";
    }

    if (!item.hobbies.length) {
      formIsValid = false;
      errors.hobbies = "please enter valid hobbies";
    }

    if (item.state === "") {
      formIsValid = false;
      errors.state = "please enter a valid state";
    }
    if (item.cities === "") {
      formIsValid = false;
      errors.cities = "please enter a valid cities";
    }
    setValidation(errors);
    return formIsValid;
  };

  const handlechange = (e) => {
    e.preventDefault();
      // validateForm();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // setValidation(errors);
    if (validateForm()) {
      if (!editIndex) {
        setUsers([...users, item]);
        reset();
      } else {
        handleupdate();
      }
    }
  };

  const handlecheckbox = (e) => {
    var arr = [...item.hobbies];
    const value = e.target.value;
    const index = arr.findIndex((v) => v === value);
    if (index > -1) {
      arr = [...arr.slice(0, index), ...arr.slice(index + 1)];
    } else {
      arr.push(value);
    }
    setItem({ ...item, hobbies: [...arr] });
  };

  const reset = () => {
    setItem({
      name: "",
      email: "",
      age: "",
      gender: "",
      hobbies: [],
      state: "",
      cities: "",
    });
  };

  const handleedit = (id) => {
    setItem(users[id]);
    setShow(true);
    setEditIndex(id);
  };

  const handleupdate = (e) => {
    e.preventDefault();
    users.splice(editIndex, 1, item);
    setUsers([...users]);
    setShow(false);
    reset();
  };

  const handledelete = (i) => {
    // users.filter((item) =>item.id !==i)
    users.splice(i, 1);
    setUsers([...users]);
  };

  const availablecities = data.state.find((c) => c.name === item.state);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name :
          <input
            type="text"
            className="form-control"
            name="name"
            value={item.name || ""}
            onChange={handlechange}
          />
        </div>
        {validation.name && (
          <small style={{ color: "red" }}>{validation.name}</small>
        )}
        <div>
          Email :
          <input
            type="text"
            name="email"
            value={item.email || ""}
            onChange={handlechange}
          />
        </div>
        {validation.email && (
          <small style={{ color: "red" }}>{validation.email}</small>
        )}

        <div>
          Age :
          <input
            type="number"
            name="age"
            value={item.age}
            onChange={handlechange}
          />
        </div>
        {validation.age && (
          <small style={{ color: "red" }}>{validation.age}</small>
        )}
        <div>
          Gender :
          <input
            type="radio"
            name="gender"
            checked={item.gender === "male"}
            value="male"
            onChange={handlechange}
          />
          Male
          <input
            type="radio"
            name="gender"
            checked={item.gender === "female"}
            value="female"
            onChange={handlechange}
          />
          Female
        </div>
        {validation.gender && (
          <small style={{ color: "red" }}>{validation.gender}</small>
        )}
        <div>
          Hobbies:
          <input
            type="checkbox"
            id="writing"
            name="hobbies"
            checked={item.hobbies.includes("writing")}
            value="writing"
            onChange={handlecheckbox}
          />
          writing
          <input
            type="checkbox"
            id="photography"
            name="hobbies"
            checked={item.hobbies.includes("photography")}
            value="photography"
            onChange={handlecheckbox}
          />
          photography
          <input
            type="checkbox"
            id="cooking"
            name="hobbies"
            checked={item.hobbies.includes("cooking")}
            value="cooking"
            onChange={handlecheckbox}
          />
          cooking
          {/* {["writing", "photography","cooking"].map((v,i)=>{
            return (
              <label key={i}>
              <input  type="checkbox" name="hobbies" value={v} onChange={handlecheckbox} checked={users.hobbies[i]==={v}}/>
              {v}
              </label>
            )
          })} */}
        </div>
        {validation.hobbies && (
          <small style={{ color: "red" }}>{validation.hobbies}</small>
        )}
        <div>
          State:
          <select value={item.state} name="state" onChange={handlechange}>
            <option>select state</option>
            {data.state.map((value, index) => {
              return (
                <option value={value.name} key={index}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        {validation.state && (
          <small style={{ color: "red" }}>{validation.state}</small>
        )}
        <div>
          City:
          <select value={item.cities} name="cities" onChange={handlechange}>
            <option>select cities</option>
            {availablecities?.cities?.map((value, index) => {
              return (
                <option value={value} key={index}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        {validation.cities && (
          <small style={{ color: "red" }}>{validation.cities}</small>
        )}
        <div>
          {!show ? (
            <button onSubmit={handleSubmit}>Add</button>
          ) : (
            <button onClick={handleupdate}>Update</button>
          )}
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th>Age</th>
            <th>State</th>
            <th>City</th>
            {/* <th>Edit</th> */}
            {/* <th>Delet</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.gender}</td>
              <td>{v.hobbies}</td>
              <td>{v.age}</td>
              <td>{v.state}</td>
              <td>{v.cities}</td>
              {/* <td>
                <button
                  onClick={() => {
                    handleedit(i);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={(e) => {
                    handledelete(i);
                  }}
                >
                  delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
