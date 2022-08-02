import React, { useState } from "react";
import axios from "axios";
export default function Register() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });
  const RegisterUsers = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const PostRegisterData = (e) => {
    e.preventDefault();
    axios
      .post("https://yousoft.herokuapp.com/signup", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .then((res) => {
        console.log(res, "posted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        width: "600px",
        height: "400px",
        margin: "auto",
        border: "1px solid black",
      }}
    >
      <form
        onSubmit={(e) => {
          PostRegisterData(e);
        }}
      >
        <input
          type="text"
          placeholder="name..."
          name="name"
          value={data.name}
          onChange={RegisterUsers}
        />
        <br />
        <input
          type="number"
          placeholder="phone"
          name="phone"
          value={data.phone}
          onChange={RegisterUsers}
        />
        <br />
        <input
          type="text"
          placeholder="email"
          name="email"
          value={data.email}
          onChange={RegisterUsers}
        />
        <br />
        <input
          type="text"
          placeholder="password"
          name="password"
          value={data.password}
          onChange={RegisterUsers}
        />
        <br />
        <input
          type="text"
          placeholder="role"
          name="role"
          onChange={RegisterUsers}
          value={data.role}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
