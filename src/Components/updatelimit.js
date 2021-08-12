import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { RiAlertFill } from "react-icons/ri";

function UpdateLimit() {
  const [locations, setlocations] = useState([]);
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [organization, setorganization] = useState("");
  const [data, setdata] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const handleChange = (e) => {
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handlecancel = () => {
    history.push("/alllimits");
  };

  // const PutDepartmentProf = () => {
  //     axios
  //     .put(`/v1/fe/root/org/department`, {
  //         id: organization.department_profile_id,
  //         locationId: values.id,
  //         label: values.label,
  //         name: values.name,
  //         description: values.description

  //     })
  //     .then((response) => {
  //       alert("Data Submited Succcessfully");
  //       console.log(response.status);
  //       setdata(response.data);
  //       console.log(data)
  //       if (!data) return "No post!";
  //     })
  //     .catch((err) =>
  //     {alert("Failed to Submit Location Profile")
  // })
  // }

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //    //seterrors(validationLocationProfile(values));
  //    PutDepartmentProf();
  //   };

  return (
    <div className=" bg-light">
      
      <div className=" UserID bg-white  ">
      <Container>
          <Form >
            
            <Row >
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text"> Resource ID</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="name"
                    placeholder=" name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row >
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Request Limit</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="description"
                    placeholder="description"
                    value={values.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="pb-1 ">
              <button className="btn1">Save</button>
              <button className="btn2 " onClick={handlecancel}> Cancel</button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default UpdateLimit;
