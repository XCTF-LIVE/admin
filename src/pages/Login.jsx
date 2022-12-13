import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleSubmit = (e) => {
    console.log("test123");
    e.preventDefault();
    try {
      axios
        .post(
          "https://api.xctf.live/auth/login",
          {
            ...values,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("test");
          const data = res;
          console.log(data);
          if (data) {
            if (data.errors) {
              generateError(data.errors);
            } else {
              navigate("/");
            }
          } else {
            console.log("test3");
          }
        })
        .catch(() => console.log("catch 123"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>XCTF LIVE Admin</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}
