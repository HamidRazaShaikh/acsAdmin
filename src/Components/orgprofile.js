import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function Orgprofile() {
  const [organization, setorganization] = useState("");

  const getData = () => {
    axios
      .get("/v1/fe/root/org/organization/all")
      .then((response) => {
        const Alldata = response.data.payload.organization;

        setorganization(Alldata);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-light">
     <Sidebar title="Organization"/>
      <div className="container pt-5">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Organization Profile</div>
          <div className="">
            {/* <button className="btn btn-primary mx-3 px-4 py-1">View</button> */}
            <Button className="btn btn-warning px-4 py-1" href="/updateorgprofile">
              {" "}
              Edit
            </Button>
          </div>
          {/* for Input Feild */}
        </div>

        <Container>
          <Form>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
            
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
                    name="address"
                    placeholder={organization.organization_name}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-1">
              {/* <button className="btn1">Update</button>
                            <button className="btn2">Reset</button> */}
            </div>
          </Form>
        </Container>
      </div>
      <div className="container pt-4">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Organization Contact</div>
          <div className="">
            {/* <button className="btn btn-primary mx-3 px-4 py-1">View</button> */}
            <Button className="btn btn-warning px-4 py-1" href="/User1">
              
              Edit
            </Button>
          </div>
          {/* for Input Feild */}
        </div>

        <Container>
          <Form>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
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
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Email</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="address"
                    placeholder={organization.email}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Adress</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="address"
                    placeholder={organization.address}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">City</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="address"
                    placeholder={organization.city}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">State</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="address"
                    placeholder={organization.state}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">ZIP Code</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder={organization.zip_code}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Phone 1</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="address"
                    placeholder={organization.phone_one}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">Phone 2</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder={organization.phone_two}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="pb-5">
              {/* <button className="btn1">Update</button>
                            <button className="btn2">Reset</button> */}
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
