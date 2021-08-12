import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import Notification from './message'




export default function UpdateOrgProfile() {
  const [values, setvalues] = useState({});
  const [organization, setorganization] = useState("");
  const [name, setname] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/v1/fe/root/org/organization/all")
      .then((response) => {
        const Alldata = response.data.payload.organization;

        setorganization(Alldata);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handleChange = (e) => {
    e.persist();
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    Array.from(document.getElementsByName("orgname")).forEach(
      (input) => (input.value = "")
    );
  };


  const Updatename = () => {
    axios
      .put("/v1/fe/root/org/organization/profile", {
        name: values.orgname,
      })
      .then((response) => {
        // alert(" Updated Succcessfully");
        setNotify({
          isOpen: true,
          message: 'Updated Succcessfully',
          type: 'success'
      })
        console.log(response.status);
        setname(response.data);
        if (!name) return "No post!";
      })
      .catch((err) =>{
        setNotify({
          isOpen: true,
          message: 'Failed To Update',
          type: 'error'
      })
      } )
  };

  const handleSubmit = (e) => {
    e.preventDefault()
   Updatename()
  }

  return (
    <div className="bg-light">
      <Sidebar />
      <div className="container pt-5">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Organization Profile</div>
          <div className=""></div>
          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group
                  className="mb-4 justify-content-between"
                  controlId="#"
                >
                  <Form.Label>
                    <small className="text">Identifier</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="address"
                    placeholder={organization.organization_identifier}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">Name</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="orgname"
                    value={values.orgname}
                    onChange={handleChange}
                    placeholder={organization.organization_name}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <button className="btn1">Update</button>
              <button className="btn2" onClick={handleReset}>
                Reset
              </button>
            </div>
          </Form>
        </Container>
      </div>
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
  );
}
