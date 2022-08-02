import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const LoginUsers = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const LoginData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        // console.log(res.data.token);
        sessionStorage.setItem("token", res.data.token);
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
          LoginData(e);
        }}
      >
        <input
          type="text"
          placeholder="email"
          name="email"
          value={data.email}
          onChange={LoginUsers}
        />
        <br />
        <input
          type="text"
          placeholder="password"
          name="password"
          value={data.password}
          onChange={LoginUsers}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
