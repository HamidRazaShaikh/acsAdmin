import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";
import axios from "axios";
import ReactLoading from "react-loading";

export default function UserDetailProfile(props) {
  //   const [medicals, setmedicals] = useState([]);
  const [medData, setmedData] = useState([]);
  const [values, setvalues] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [done, setdone] = useState(undefined);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const loadMedData = async () => {
    const response = await axios.get(`/v1/fe/root/usr/users/offset/0`);

    setmedData(response.data.payload.users);
    console.log(id);
    setdone(true);
  };

  useEffect(() => {
    loadMedData();
  }, []);

  const handleChange = (e) => {
    e.persist();
    //seterrors(validationemail(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handlecancel = () => {
    history.push("/allusers");
  };
  /////////////////////////////
  const UpdateMedical = () => {
    axios
      .put(`/v1/fe/root/usr/user/profile`, {
        userId: id,
        countryOfBirth: values.birthcountry,
        firstName: values.firstname,
        middleName: values.middlename,
        lastName: values.lastname,
        gender: values.gender,
        dateOfBirth: values.dob,
        placeOfBirth: values.birthplace,
      })
      .then((response) => {
        //alert("Data Updated Succcessfully");
        setNotify({
          isOpen: true,
          message: "Updated Succcessfully",
          type: "success",
        });
        console.log(response.status);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: `Failed To Update${err}`,
          type: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    UpdateMedical();
  };

  const dot = medData
    .filter((meds) => {
      return id == meds.ua_user_id;
    })
    .map((meds) => {
      return (
        <div>
          <div className="contact py-5 d-flex justify-content-between"></div>
          <div className="font-weight-bold h5">User ID: {id}</div>
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
                    placeholder={meds.u_first_name}
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
                    placeholder={meds.u_middle_name}
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
                    placeholder={meds.u_last_name}
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
                    <small className="text">
                      Date Of Birth:-
                      <span className="db">{meds.u_date_of_birth}</span>
                    </small>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    placeholder={meds.u_date_of_birth}
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
                    placeholder={meds.u_place_of_birth}
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
                    placeholder={meds.u_country_of_birth}
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
              <button className="btn1">Update</button>
              <button className="btn2" onClick={handlecancel}>
                Cancel
              </button>
            </div>
          </Form>
        </div>
      );
    });

  return (
    <div className="bg-light">
      <Sidebar />

      <div className="container-fluid d-flex justify-content-center pt-4 upbton">
        <Row>
          {/* <a href="/userdetailprofile"> */}{" "}
          <button
            className="btn01"
            //onClick={() => history.push(`/userdetailprofile/${id}`)}
          >
            Profile
          </button>
          {/* </a> */}
          {/* <a href="/usercontact"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/usercontact/${id}`)}
          >
            Contact
          </button>
          {/* </a> */}
          {/* <a href="/useremail"> */}
          <button
            className="btn02"
            onClick={() => history.push(`/useremail/${id}`)}
          >
            Email
          </button>
          {/* </a> */}
          {/* <a href="/userpassword"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/userpassword/${id}`)}
          >
            Password
          </button>
          {/* </a> */}
          {/* <a href="/useraccess"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/useraccess/${id}`)}
          >
            Access
          </button>
          {/* </a> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/userpolicy/${id}`)}
          >
            Policy
          </button>{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/userdepartment/${id}`)}
          >
            Department
          </button>
        </Row>
      </div>
      {/* for Contact */}

      <Container>
        {!done ? (
          <ReactLoading
            type={"bubbles"}
            color={"grey"}
            height={120}
            width={320}
            className="loader"
          />
        ) : (
          dot
        )}
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
