import React, {useState} from "react";
import { Container, Row, Col, Form} from "react-bootstrap";
import Sidebar from "./Sidebar";
import  validationLocationProfile from './locationprofvalidation'
import axios from 'axios'
import {useHistory } from 'react-router-dom'
import Notification from './message'


export default function LocationProfile() {

    const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [data, setdata] = useState(null);
  const history = useHistory()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


  

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrors(validationLocationProfile(values));
    PostLocationProf();
  };


  const handleChange = (e) => {
    e.persist();
    // seterrors(validationLocationProfile(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
const handlecancel = () => {
history.push('/orgprofile')
}
  const PostLocationProf = () => {
    axios
    .post("/v1/fe/root/org/location", {
      email: values.email ,
      address: values.address,
      city:  values.city,
      state: values.state,
      zipCode: values.zipcode,
      phoneNumberOne:values.phone1,
      phoneNumberTwo:values.phone2
      
    })
    .then((response) => {
      //alert("Data Submited Succcessfully");
      setNotify({
        isOpen: true,
        message: 'Submited Succcessfully',
        type: 'success'
    })
      console.log(response.status);
      setdata(response.data);
      console.log(data)
      if (!data) return "No post!";
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: 'Failed To Submit',
        type: 'error'
    })
    })
}
  

  return (
    <div className="bg-light">
      <Sidebar title="Organization"/>

      <div className="container pt-4">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Location Profile</div>
          
          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Email</small>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.email && <p className="error">{errors.email}</p>}
                <br />
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
                    placeholder="Your Adress"
                    value={values.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.address && <p className="error">{errors.address}</p>}
                <br />
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">City</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="city"
                    placeholder="Your City"
                    value={values.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.city && <p className="error">{errors.city}</p>}
                <br />
              </Col>

              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">State</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="state"
                    placeholder="Your State"
                    value={values.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.state && <p className="error">{errors.state}</p>}
                <br />
              </Col>
            </Row>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4 " controlId="#">
                  <Form.Label>
                    <small className="text">ZIP Code</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="zipcode"
                    placeholder="ZIP Code"
                    value={values.zipcode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                <br />
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Phone 1</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="phone1"
                    placeholder="Your Phone 2"
                    value={values.phone1}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.phone1 && <p className="error">{errors.phone1}</p>}
                <br />
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
                    placeholder="Your Phone 2"
                    value={values.phone2}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {errors.phone2 && <p className="error">{errors.phone2}</p>}
                <br />
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
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
  );
}
