import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { RiAlertFill } from "react-icons/ri";

function AddResourcelimit(props) {
  
  const [locations, setlocations] = useState([]);
  const [ID, setID] = useState([]);
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
    history.push("/alldepartments");
  };

  const loadID = async () => {
    const response = await axios.get("/v1/fe/root/plsv/policy/cache/all");
    setID(response.data.payload.policies);
    console.log(props.uuid)
  };

  useEffect(() => {
    loadID();
  }, []);

  const PostLimit = () => {
      axios
      .post(`/v1/fe/root/plsv/policy`, {
        groupUUID: props.uuid,
        serviceId: values.id,
        permissionType: values.permission

      })
      .then((response) => {
        alert("Data Submited Succcessfully");
        console.log(response.status);
        console.log(response.data);
        setdata(response.data);
        console.log(data)
        if (!data) return "No post!";
      })
      .catch((err) =>
      {alert("Failed to Submit Location Profile")
  })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
     //seterrors(validationLocationProfile(values));
     PostLimit();
    };

  return (
    <div className=" bg-light">
      
      <div className=" UserID bg-white  ">
      <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
            <small className="text"> Resource ID</small>
            </Row>
            <Row >
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    
                  </Form.Label>
                  {/* <Form.Control
                    type="Text"
                    name="name"
                    placeholder=" name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  /> */}
                   <select
                    name="id"
                    value={values.id}
                    onChange={handleChange}
                    className="shadow drpdowno"
                  >
                    {ID.map((ids, index) => (
                      <option value={ids.service_id}>
                        {ids.service_id}
                      </option>
                      
                    ))}
                  </select>
                </Form.Group>
              </Col>
            </Row>

            <Row >
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Permission</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="permission"
                    placeholder="Read or Write"
                    value={values.permission}
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

export default AddResourcelimit;
