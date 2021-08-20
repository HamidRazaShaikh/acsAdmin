import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Notification from "./message";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

export default function AddUser() {
  const [values, setvalues] = useState({});
  const history = useHistory();
  const [data, setdata] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    e.persist();
    //seterrors(validationLocationProfile(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handlecancel = () => {
    history.push("/allusers");
  };

  const PostUserData = () => {
    axios
      .post("/v1/fe/root/usr/user/profile", {
        firstName: values.firstname,
        middleName: values.middlename,
        lastName: values.lastname,
        dateOfBirth: values.dob,
        placeOfBirth: values.birthplace,
        contryOfBirth: values.birthcountry,
        gender: values.gender,
      })
      .then((response) => {
        //alert("Data Submited Succcessfully");
        setNotify({
          isOpen: true,
          message: "Submitted Successfully",
          type: "success",
        });
        console.log(response.status);
        setdata(response.data);
        console.log(data);
        if (!data) return "No post!";
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Fail To Submit",
          type: "error",
        });
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //seterrors(validationLocationProfile(values));
    PostUserData();
  };

  return (
    <div className="bg-light">
      <Sidebar title="Users" />
      <div className="container pt-4">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">User Profile</div>
          <div className="">
            {/* <button className="btn btn-primary mx-3 px-4 py-1"></button> */}
            {/* <Button className="btn btn-warning px-4 py-1" href="/User1"> Edit</Button> */}
          </div>
          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">First Name</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="firstname"
                    placeholder="first name"
                    value={values.firstname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Middle Name</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="middlename"
                    placeholder="middle name"
                    value={values.middlename}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Last Name</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="lastname"
                    placeholder="last name"
                    value={values.lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">Date Of Birth</small>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    placeholder="dd-mm-year"
                    value={values.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Place of Birth</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="birthplace"
                    placeholder="place of birth"
                    value={values.birthplace}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">Country Of Birth</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="birthcountry"
                    placeholder="country of birth"
                    value={values.birthcountry}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <FormControl>
                    <Form.Label>
                      <small className="text">Gender</small>
                    </Form.Label>
                    <RadioGroup
                      className="d-inline color-primary"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      required
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </Form.Group>
              </Col>
            </Row>

            <div className="pb-5">
              <button className="btn1">Save</button>
              <button className="btn2" onClick={handlecancel}>
                Cancel
              </button>
            </div>
          </Form>
        </Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
