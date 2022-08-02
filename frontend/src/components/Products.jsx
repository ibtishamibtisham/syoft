import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateProd from "./CreateProd";
import Invetory from "./Invetory";
import { Link, useNavigate } from "react-router-dom";

export default function Products() {
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState([]);
  let [state, setState] = useState(false);
  let [state1, setState1] = useState(false);
  let [role, setRole] = useState("");
  const navigate = useNavigate();
  const shoData = () => {
    setRole(window.sessionStorage.getItem("role"));
    let token = window.sessionStorage.getItem("token");

    axios
      .get("http://localhost:5001/getallproducts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setShow(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    shoData();
  }, []);

  return (
    <div>
      <h1>Welcome to product page</h1>
      <button>Logout</button>
      <div>
        {role == "admin" ? (
          <>
            <button
              onClick={() => {
                setState(!state);
              }}
            >
              createproduct
            </button>
            <button
              onClick={() => {
                setState(!state);
              }}
            >
              update inventory
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setState(!state);
            }}
          >
            update inventory
          </button>
        )}
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>{state == false ? <CreateProd /> : <Invetory />}</div>
          <div>
            {show.map((item) => {
              return (
                <div
                  style={{
                    width: "300px",
                    height: "200px",
                    border: "1px solid black",
                    margin: "auto",
                  }}
                >
                  <h2>name:{item.productname}</h2>
                  <p>
                    price:<strong>{item.productprice}</strong>
                  </p>
                  <p>
                    description:<strong>{item.productdescription}</strong>
                  </p>
                  <p>
                    count of inventory:<strong>{item.inventorycount}</strong>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
