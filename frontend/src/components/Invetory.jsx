import React, { useState } from "react";
import axios from "axios";

export default function Invetory() {
  const [data, setData] = useState({
    name: "",
    count: "",
  });
  const creatProducts = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const ProductData = (e) => {
    let token = window.sessionStorage.getItem("token");
    e.preventDefault();
    axios
      .put(
        "http://localhost:5001/updateinventory",
        {
          name: data.name,
          count: data.count,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          ProductData(e);
        }}
      >
        <input
          type="text"
          placeholder="productname..."
          name="name"
          value={data.name}
          onChange={creatProducts}
        />
        <br />
        <input
          type="number"
          placeholder="productprice"
          name="count"
          value={data.count}
          onChange={creatProducts}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
