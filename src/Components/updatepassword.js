import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import validationpass from "./validationpass";
import axios from "axios";
import Notification from "./message";
import usePasswordToggle from "./usePasswordToggle";

export default function Updatepwd() {
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [password, setpassword] = useState(null);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    e.persist();
    //seterrors(validationpass(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    Array.from(document.getElementsByClassName("pass")).forEach(
      (input) => (input.value = "")
      //values.pass == ""
    );
  };

  const Updatepassword = () => {
    axios
      .put("/v1/fe/root/org/admin/password", {
        password: values.confirmpass,
      })
      .then((response) => {
        // alert("Password Updated Succcessfully");
        setNotify({
          isOpen: true,
          message: "Password Updated Succcessfully",
          type: "success",
        });
        console.log(response.status);
        setpassword(response.data);
        if (!password) return "No post!";
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Fail to update Password ",
          type: "error",
        });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    seterrors(validationpass(values));
    Updatepassword();
  };

  return (
    <div className=" mainbody bg-light">
      <Sidebar title="Profile"/>
      <div className="container pt-5">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Update Password</div>
          {/* <div className="">
                        <button className="btn btn-primary mx-3 px-4 py-1">View</button>
                        <button className="btn btn-warning px-4 py-1">Edit</button>
                    </div> */}
          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">New Password</small>
                  </Form.Label>
                  <Form.Control
                    className="pass"
                    type={PasswordInputType}
                    name="pass"
                    placeholder="password"
                    id="pass"
                    required
                    value={values.pass}
                    onChange={handleChange}
                  />
                </Form.Group>
                <span className="password-toogle-icons">{ToggleIcon}</span>
                {errors.pass && <p className="error">{errors.pass}</p>}
                <br />
              </Col>
            </Row>

            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Confirm New Password</small>
                  </Form.Label>
                  <Form.Control
                    className="pass"
                    type={PasswordInputType}
                    name="confirmpass"
                    placeholder="password"
                    id="cnfrmpass"
                    required
                    value={values.confirmpass}
                    onChange={handleChange}
                  />
                </Form.Group>
                <span className="password-toogle-icons">{ToggleIcon}</span>
                {errors.confirmpass && (
                  <p className="error">{errors.confirmpass}</p>
                )}
                <br />
              </Col>
            </Row>

            <div className="pb-5">
              <button className="btn1">Update</button>
              <button onClick={handleReset} id="reset" className="btn2">
                Reset
              </button>
            </div>
          </Form>
        </Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
