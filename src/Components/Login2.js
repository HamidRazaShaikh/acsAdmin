import React, { useState } from "react";
import Clogo from "../assets/images/Clogo.png";
import cover from "../assets/images/cover.png";
import hello from '../assets/images/hello.jpg';

import { useHistory, Link } from "react-router-dom";
import "./Login2.css";
import axios from "axios";

import validation from "./validation";
import usePasswordToggle from "./usePasswordToggle";
import Notification from "./message";



export default function Login2() {
    const [values, setvalues] = useState({});
    const [errors, seterrors] = useState({});
    const history = useHistory();
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });


  const handleChange = (e) => {
    e.persist();

    const { name, value } = e.target;
    setvalues((prval) => {
      return {
        ...prval,
        [name]: value,
      };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // seterrors(validation(values));

    seterrors(validation(values));



    const url =
      "https://ec2-18-212-236-109.compute-1.amazonaws.com/v1/fe/root/org/admin/signin";

    // for posting data to server

    axios
      .post(url, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        // history.go(-1);
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Login Succcessfully",
            type: "success",
          });
          history.push("/getEmail");
        } else if (res.status !== 200) {
          setNotify({
            isOpen: true,
            message: "Login Failed",
            type: "error",
          });
        }
        console.log(res.status);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setNotify({
            isOpen: true,
            message: `Failed To Login${err}`,
            type: "error",
          });
        }
      });
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row w-100 vh-100 ml-0">
        {/* left div */}
        <div className="col-md-6 col-sm-12 p-0 d-flex flex-column justify-content-center align-items-center order-1 order-sm-2 order-md-1">
          {/* logo*/}

          <div className="d-flex justify-content-center w-100 mt-5">
            <img style = {{ height : '100%', width : '20%'}} src={Clogo} alt="Clogo.png" />;
          </div>

          {/* form  */}

          <div className="d-flex flex-column align-items-center w-100 mt-5">
            <h3>Welcome Back</h3>


            <div style={{ width: "70%" }}>
              <form onSubmit={handleSubmit}>
              <input
                  className="form-control mb-2 mt-3"
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  autoFocus
                  onChange={handleChange}
                />
                {errors.email && <p className="d-flex error">{errors.email}</p>}


                <input
                  className="form-control"
                  type={PasswordInputType}
                  placeholder="password"
                  id="pwd"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <span className="password-toogle-icon">{ToggleIcon}</span>
                {errors.password && <p className="d-flex error">{errors.password}</p>}

               
                <div className="d-flex flex-row justify-content-between mt-3">
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      name="checkbox"
                      id="box"
                    />

                    <small>Remember&nbsp;me</small>
                  </div>

                  <div>
                    <Link
                      to="#"
                    >
                      <small className="text-dark">Forget&nbsp;password?</small>
                    </Link>
                  </div>
                </div>
                <input
                  type="submit"
                  className=" w-100 btn btn-primary mt-3 bton"
                  defaultValue="Login"
                  style={{
                    padding: "2% 10%",
                    borderRadius: "100px",
                    fontWeight: "bold",
                  }}
                />

                <div className="text-center mt-3">
                  <p>
                    Don't have an account? &nbsp;
                    <a className="register" href="Register.html">
                      Register now
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* right div */}

        <div className="col-md-6 col-sm-12 p-0 d-flex flex-column order-2 order-sm-1 order-md-2">
          <img
            className="d-none d-sm-flex"
            style={{ height: "100%", width: "100%" }}
            src={hello}
            alt=""
          />
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />

    </div>
  );
}
