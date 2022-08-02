import React, { useState } from "react";
import axios from "axios";

export default function Products() {
  const [data, setData] = useState({
    productname: "",
    productprice: "",
    productdescription: "",
    inventorycount: "",
    token: "",
  });
  const creatProducts = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const ProductData = (e) => {
    let token = window.sessionStorage.getItem("token");
    e.preventDefault();
    axios
      .post(
        "http://localhost:5001/createproducts",
        {
          productname: data.productname,
          productprice: data.productprice,
          productdescription: data.productdescription,
          inventorycount: data.inventorycount,
          token,
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
          ProductData(e);
        }}
      >
        <input
          type="text"
          placeholder="productname..."
          name="productname"
          value={data.productname}
          onChange={creatProducts}
        />
        <br />
        <input
          type="number"
          placeholder="productprice"
          name="productprice"
          value={data.productprice}
          onChange={creatProducts}
        />
        <br />
        <input
          type="text"
          placeholder="productdescription"
          name="productdescription"
          value={data.productdescription}
          onChange={creatProducts}
        />
        <br />
        <input
          type="text"
          placeholder="inventorycount"
          name="inventorycount"
          value={data.inventorycount}
          onChange={creatProducts}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
