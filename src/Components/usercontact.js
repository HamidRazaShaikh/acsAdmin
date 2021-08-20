import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";
import axios from "axios";
import ReactLoading from "react-loading";

export default function UserContact(props) {
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
      .put(`/v1/fe/root/usr/user/contact`, {
        idNumber: values.idnumber,
        address: values.address,
        city: values.city,
        userId: id,
        phoneNumberOne: values.phone,
        phoneNumberTwo: values.phone2,
        state: values.state,
        zipCode: values.zipcode,
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
          <div className="contact py-3 d-flex justify-content-between mb-1"></div>
          <div className="font-weight-bold h5  mb-3">User ID: {id}</div>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">ID Number</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="idnumber"
                    placeholder={meds.uc_id_number}
                    value={values.idnumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Adress</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="address"
                    placeholder={meds.uc_address}
                    value={values.address}
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
                    <small className="text">City</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="city"
                    placeholder={meds.uc_city}
                    value={values.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">State/Province</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder={meds.uc_state}
                    value={values.state}
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
                    <small className="text">Zip Code</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="zipcode"
                    placeholder={meds.uc_zip_code}
                    value={values.zipcode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">Phone 1</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder={meds.uc_phone_one}
                    value={values.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">Phone 2</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone2"
                    placeholder={meds.uc_phone_two}
                    value={values.phone2}
                    onChange={handleChange}
                    required
                  />
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
            className="btn02"
            onClick={() => history.push(`/userdetailprofile/${id}`)}
          >
            Profile
          </button>
          {/* </a> */}
          {/* <a href="/usercontact"> */}{" "}
          <button className="btn01">Contact</button>
          {/* </a> */}
          {/* <a href="/useremail"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/useremail/${id}`)}
          >
            Email
          </button>
          {/* </a> */}
          <a href="/userpassword">
            {" "}
            <button className="btn02">Password</button>
          </a>
          <a href="/useraccess">
            {" "}
            <button className="btn02">Access</button>
          </a>
          <a href="/userpolicy">
            {" "}
            <button className="btn02">Policy </button>
          </a>
          <a href="/userdepartment">
            {" "}
            <button className="btn02">Department</button>
          </a>
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
