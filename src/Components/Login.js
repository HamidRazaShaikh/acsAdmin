import React, { useState } from "react";
import Clogo from "../assets/images/Clogo.png";
import cover from "../assets/images/cover.png";
import validation from "./validation";
import { useHistory, Link } from "react-router-dom";
import usePasswordToggle from "./usePasswordToggle";
import Notification from "./message";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
  const [values, setvalues] = useState({});

  const [errors, seterrors] = useState({});
  const history = useHistory();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrors(validation(values));
    PostApi();
  };

  const handleChange = (e) => {
    e.persist();
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const PostApi = () => {
    fetch("/v1/fe/root/org/admin/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
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
        }

        console.log(res.status);
      })
      .catch((err) => {
        setNotify({
            isOpen: true,
            message: `Failed To Login${err}`,
            type: "error",
          });
      });
  };
  return (
    <div className="container-fluid">
      {/* left section */}
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <img className="imag" src={Clogo} alt="Clogo.png" />
          <div className=" alignment px-2 mt-1 pt-2">
            <h2 className="head font-weight-bolder">Welcome Back</h2>
            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="control-form mt-5">
                <input
                  className="form-control mb-3"
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <br />
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
                {errors.password && <p className="error">{errors.password}</p>}
                <br />
                <div className="d-flex justify-content-between my-3">
                                    <div>
                                        <input className="mr-1" type="checkbox" name="checkbox" id="box" />
                                        <small>Remember&nbsp;me</small>
                                    </div>
                                    <div>
                                        <Link className="text-danger text-decoration-none fp" to="#">
                                            <small className="text-dark">Forget&nbsp;password?</small></Link><br />
                                    </div>
                                </div>

                {/* button */}
                <input
                  type="submit"
                  className=" w-100 btn btn-primary my-5 bton"
                  defaultValue="Login"
                  style={{ padding: "3% 40%", borderRadius: "10px" }}
                />
                <br />
                <div className="text-center">
                  <p className="forget">
                    Don't have an account? &nbsp;
                    <a className="register" href="Register.html">
                      Register now
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* right section */}
        <div className="col-md-6 col-sm-12 pic">
          <img className=" cover-img w-100" src={cover} alt="" />
        </div>
        {/* for row */}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
    //   {/* for body */ }
  );
}
