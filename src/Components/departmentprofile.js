import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import {useHistory } from 'react-router-dom'
import Notification from './message'


function AllLocations() {
  const [locations, setlocations] = useState([]);
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [data, setdata] = useState("");
  const history = useHistory()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  const loadLocations = async () => {
    const response = await axios.get(
      "/v1/fe/root/org/location/all"
    );
    setlocations(response.data.payload.locations);
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
    history.push('/alldepartments')
    }

    const PostDepartmentProf = () => {
        axios
        .post("/v1/fe/root/org/department", {
            locationId: values.id,
            label: values.label,
            name: values.name,
            description: values.description
          
        })
        .then((response) => {
          //alert("Data Submited Succcessfully");
          setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
          console.log(response.status);
          setdata(response.data);
          console.log(data)
          if (!data) return "No post!";
        })
        .catch((err) => 
        {
          setNotify({
            isOpen: true,
            message: 'Fail To Submit',
            type: 'error'
        })
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       //seterrors(validationLocationProfile(values));
       PostDepartmentProf();
      };
    

  return (
    <div className="mainbody bg-light">
      <Sidebar />
      <div className="fluid">
        <h4 className="page3">Department Profile</h4>
      </div>
      <div className=" UserID bg-white mt-3 pt-4">
        <Container>
          <Form onSubmit={handleSubmit}>
            <hr className="mb-5" />
            {/* FOR USER DATA-1 */}

            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Location</small>
                  </Form.Label>

                  {/* <Form.Control
                    type="Text"
                    name="location"
                    placeholder="location"
                    value={values.location}
                    onChange={handleChange}
                    required
                  /> */}
                  <select name="id" value={values.id } onChange={handleChange} className="shadow drpdown">
                    {locations.map((location, index) => (
                      <option value={location.id}>
                        {location.address}-{location.city} {" "}
                        {location.id}
                      </option>
                    ))}
                  </select>
                  <br />
                </Form.Group>
                {/* {errors.location && <p className="error">{errors.location}</p>} */}

                <br />
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Name</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {/* {errors.name && <p className="error">{errors.name}</p>} */}
                <br />
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Label</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="label"
                    placeholder="label"
                    value={values.label}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
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
                </Form.Group>{" "}
                <br />
              </Col>
            </Row>

            <div className="pb-5 pt-3">
              <button className="btn1">Save</button>
              <button className="btn2" onClick={handlecancel}>Cancel</button>
            </div>
            <hr />
            {/* FOR USER DATA-2 */}
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

export default AllLocations;
