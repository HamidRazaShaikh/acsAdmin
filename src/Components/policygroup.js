import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Notification from "./message";

export default function PolicyGroup() {
  const [depatrments, setdepartments] = useState([]);
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [data, setdata] = useState("");
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const loadLocations = async () => {
    const response = await axios.get("/v1/fe/root/org/department/all");
    setdepartments(response.data.payload.departments);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleChange = (e) => {
    e.persist();
    //seterrors(validationLocationProfile(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handlecancel = () => {
    history.push("/allpolicygroup");
  };

  const PostPolicyGroup = () => {
    axios
      .post("/v1/fe/root/plsv/group", {
        departmentId: values.id,
        name: values.name,
        description: values.description,
      })
      .then((response) => {
        //alert("Data Submited Succcessfully");
        setNotify({
          isOpen: true,
          message: "Submitted Succcessfully",
          type: "success",
        });
        console.log(response.status);
        setdata(response.data);
        //console.log(data);
        if (!data) return "No post!";
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Failed To Submit",
          type: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //seterrors(validationLocationProfile(values));
    PostPolicyGroup();
  };

  return (
    <div className="bg-light">
      <Sidebar title="Access Control"/>

      <div className="container pt-4">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Policy Group</div>

          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Department</small>
                  </Form.Label>
                  {/* <Form.Control type="Text" name="department" placeholder="department" /> */}
                  <select
                    name="id"
                    value={values.id}
                    onChange={handleChange}
                    className="shadow drpdown"
                  >
                    {depatrments.map((location, index) => (
                      <option value={location.department_profile_id}>
                        {location.department_profile_name}{" "}
                        {location.department_profile_id}
                      </option>
                    ))}
                  </select>
                  <br />
                </Form.Group>
              </Col>
            </Row>

            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text"> Name</small>
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

            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Description</small>
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

            <div className="pb-5">
              <button className="btn1">Save</button>
              <button className="btn2" onClick={handlecancel}>
                {" "}
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
