import React from "react";
import "./login.css";
import logo from "../../img/logo2.png";
import { url } from "../../constants/constants";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [userName, setUsetName] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url.auth}`, {
        userName,
        password,
      });
      window.location.reload(false);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("logedUser", response.data.name);
      console.log(response.data.userName);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div className="login-page bg-primary"> */}
      <div className="container1">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className=" shadow rounded " style={{ background: "#1c9a37" }}>
              <div className="row">
                <div className="col-md-5 ">
                  <div className="">
                    <img
                      src={logo}
                      style={{ width: "300px", marginLeft: "50px" }}
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 pe-0">
                  <div className="form-left h-100 py-5 px-5">
                    <form action="" className="row g-4">
                      <div className="col-12">
                        <label className="text-light">
                          Username<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                          </div>
                          <input
                            type="text"
                            value={userName}
                            onChange={(userName) =>
                              setUsetName(userName.target.value)
                            }
                            className="form-control"
                            placeholder="Enter Username"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="text-light">
                          Password<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(password) =>
                              setPassword(password.target.value)
                            }
                            className="form-control"
                            placeholder="Enter Password"
                          />
                        </div>
                      </div>

                      <div className="col-12 d-flex justify-content-center align-items-center">
                        <button
                          type="submit"
                          onClick={signIn}
                          className="btn btn-primary px-4 float-end mt-4"
                        >
                          login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
export default Login;
