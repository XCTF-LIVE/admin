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
    e.preventDefault();
    try {
      axios
        .post(
          process.env.REACT_APP_SERVER_API_URL_AUTH + "/login",
          {
            ...values,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const data = res.data;
          if (data) {
            if (data.errors) {
              const { email, password } = data.errors;
              if (email) generateError(email);
              else if (password) generateError(password);
            } else {
              navigate("/");
            }
          }
        });
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
