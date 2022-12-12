import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  const [raceData, setRaceData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        axios
          .post("http://api.xctf.live/auth", {}, { withCredentials: true })
          .then((res) => {
            console.log(res.data.status);
            const data = res.data;
            if (!data.status) {
              removeCookie("jwt");
              navigate("/login");
            } else {
              toast(`Logged in as ${data.user}`, { theme: "dark" });
            }
          })
          .then(() =>
            axios
              .get("http://api.xctf.live/race/allraces")
              .then((res1) => {
                setRaceData(res1.data);
              })
              .then(
                axios
                  .get("http://api.xctf.live/race/submissions")
                  .then((res2) => {
                    setSubmissionData(res2.data);
                  })
              )
          )
          .catch((err) => {
            console.log(err);
            removeCookie("jwt");
            navigate("/login");
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const removeSubmission = (item) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER_API_URL_RACE +
          "/deletesubmission/" +
          item._id
      )
      .then(() => {
        window.location.reload();
      });
  };
  const removeRace = (item) => {
    axios
      .delete("http://api.xctf.live/race/deleterace/" + item._id)
      .then(() => {
        window.location.reload();
      });
  };
  const toggleHighlightRace = (item) => {
    axios
      .post("http://api.xctf.live/race/toggleracehighlight", {
        document: item,
      })
      .then(() => window.location.reload());
  };

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="container">
        <li>
          <h1>XCTF LIVE Admin Dashboard</h1>
          <button onClick={logOut}>Log Out</button>
        </li>
      </div>
      <div className="container">
        <h2>Submissions</h2>
        <ul>
          {submissionData.map((item) => {
            return (
              <li key={item._id}>
                <a href={item.url}>{item.url}</a>
                <button
                  onClick={() => removeSubmission(item)}
                  className="xbutton"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex">
        <div className="container">
          <h2>Races</h2>
          <ul>
            {raceData.map((item) => {
              return (
                <li key={item._id}>
                  <div>
                    {item.name +
                      "/" +
                      item.location +
                      "/" +
                      item.date.substring(0, 10) +
                      "/"}
                    <a href={item.url}>Results</a>
                  </div>
                  <div>
                    <button
                      onClick={() => toggleHighlightRace(item)}
                      className={item.isHighlighted ? "xbutton" : undefined}
                    >
                      {item.isHighlighted ? "Unhl" : "Hl"}
                    </button>
                    <button
                      onClick={() => removeRace(item)}
                      className="xbutton"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <ToastContainer />
      </div>
      <div className="container">
        <li>
          <h5>admin.xctf.live</h5>
          <button onClick={logOut}>Log Out</button>
        </li>
      </div>
    </>
  );
}
