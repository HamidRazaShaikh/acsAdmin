import React, {useState, useEffect} from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from 'axios'
import Notification from './message'


export default function User1() {
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

  const handleReset = (e) => {
    e.preventDefault()
    Array.from(document.getElementsByClassName("org")).forEach(
      (input) => (input.value = "")
    );
  };

  const UpdateorgContact = () => {
    axios
      .put("/v1/fe/root/org/organization/contact", {
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
    UpdateorgContact();
  };

  return (
    <div className="bg-light">
      <Sidebar />

      <div className="container pt-5">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Organization Contact</div>
          <div className="">
            {/* <button className="btn btn-primary mx-3 px-4 py-1">View</button> */}
            {/* <button className="btn btn-warning px-4 py-1">Edit</button> */}
          </div>
          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
              
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Identifier</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                   
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
                  className="org"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder={organization.email}
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
                  className="org"
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder={organization.address}
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
                  className="org"
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    placeholder={organization.city}
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
                  className="org"
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    placeholder={organization.state}
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
                  className="org"
                    type="text"
                    name="zipcode"
                    value={values.zipcode}
                    onChange={handleChange}
                    placeholder={organization.zip_code}
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
                  className="org"
                    type="text"
                    name="phone1"
                    value={values.phone1}
                    onChange={handleChange}
                    placeholder={organization.phone_one}
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
                  className="org"
                    type="text"
                    name="phone2"
                    value={values.phone2}
                    onChange={handleChange}
                    placeholder={organization.phone_two}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="pb-5">
              <button className="btn1" >Update</button>
              <button className="btn2" onClick={handleReset}>Reset</button>
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
