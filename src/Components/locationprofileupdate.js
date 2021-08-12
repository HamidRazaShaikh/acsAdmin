import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import validationLocationProfile from "./locationprofvalidation";
import Notification from './message'

export default function LocationProfile() {
  const [values, setvalues] = useState({});
  const [organization, setorganization] = useState("");
  const [errors, seterrors] = useState({});
  const [location, setlocation] = useState(null);
  const { id } = useParams();
  const history = useHistory()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`/v1/fe/root/org/location/${id}`)
      .then((response) => {
        const Alldata = response.data.payload.location;

        setorganization(Alldata);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handleChange = (e) => {
   
   
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleCancel = () => 
  {
    history.push('/alllocations')
  }
  ////////////////////// 
  const UpdatelocationProf = () => {
    
    axios
      .put(`/v1/fe/root/org/location/`, {
        id : organization.id,
        email: values.email ,
        address: values.address,
        city:  values.city,
        state: values.state,
        zipCode: values.zipcode,
        phoneNumberOne:values.phone1,
        phoneNumberTwo:values.phone2
        
      })
      .then((response) => {
        //alert("Data Updated Succcessfully");
        setNotify({
          isOpen: true,
          message: 'Updated Succcessfully',
          type: 'success'
      })
        console.log(response.status);
        
        
      })
      .catch((err) =>{
        setNotify({
          isOpen: true,
          message: 'Failed To Update',
          type: 'error'
      })
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    seterrors(validationLocationProfile(values));
    UpdatelocationProf();
   };

  return (
    <div className="bg-light">
      <Sidebar />

      <div className="container pt-4">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Location Profile</div>

          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
            <Col className="d-none">
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">ID</small>
                  </Form.Label>
                  <Form.Control
                   
                    value={organization.id}
                   
                    placeholder={organization.id}
                    
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
                    <small className="text">Email</small>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder={organization.email}
                    
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
                    value={values.address}
                    onChange={handleChange}
                    placeholder={organization.address}
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
                    value={values.city}
                    onChange={handleChange}
                    placeholder={organization.city}
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
                    value={values.state}
                    onChange={handleChange}
                    placeholder={organization.state}
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
                    value={values.zipcode}
                    onChange={handleChange}
                    placeholder={organization.zip_code}
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
                    value={values.phone1}
                    onChange={handleChange}
                    placeholder={organization.phone_one}
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
                    Name="phone2"
                    value={values.phone2}
                    onChange={handleChange}
                    placeholder={organization.phone_two}
                    required
                  />
                </Form.Group>
                {errors.phone2 && <p className="error">{errors.phone2}</p>}
                <br />
              </Col>
            </Row>

            <div className="pb-5">
              <button className="btn1" >
                Update
              </button>
              <button className="btn2" onClick={handleCancel}>Cancel</button>
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
