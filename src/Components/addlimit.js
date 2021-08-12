import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { RiAlertFill } from "react-icons/ri";

function Addlimit() {
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
    const response = await axios.get("/v1/fe/root/med/resources");
    setID(response.data.payload.resources);
  };

  useEffect(() => {
    loadID();
  }, []);

  const PostLimit = () => {
      axios
      .pot(`/v1/fe/root/org/department`, {
          id: organization.department_profile_id,
          locationId: values.id,
          label: values.label,
          name: values.name,
          description: values.description

      })
      .then((response) => {
        alert("Data Submited Succcessfully");
        console.log(response.status);
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
          <Form >
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
                      <option value={ids}>
                        {ids} 
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
              <button className="btn2 " onClick={handlecancel}> Reset</button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Addlimit;
