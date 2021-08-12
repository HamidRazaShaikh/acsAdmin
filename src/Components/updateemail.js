import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import validationemail from "./validationemail";
import axios from 'axios'
import Notification from './message'


export default function Updatemail(props) {
    const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [email, setemail] = useState(null)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  const handleSubmit = (e) => {
   
    e.preventDefault();
    //seterrors(validationemail(values));    
    Updateemail()
   
  };

  const handleChange = (e) => {
    e.persist();
    seterrors(validationemail(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleReset = () => {
    Array.from(document.getElementsByName("newemail")).forEach(
      (input) => (input.value = "")
    );
  };

  //Updating Function

  const Updateemail = () => {
    axios
      .put('/v1/fe/root/org/admin/account', {
        email: values.newemail
      })
      .then((response) => {
          //alert('Email Updated Succcessfully')
          setNotify({
            isOpen: true,
            message: 'Email Updated Succcessfully',
            type: 'success'
        })

          console.log(response.status)
        setemail(response.data);
        if (!email) return "No post!"
      }).catch((err) => {
        setNotify({
          isOpen: true,
          message: 'Fail to update',
          type: 'error'
      })
      })
  }
  const ShowData = (props) => {
    const { organization } = props;

    if (organization !== undefined || organization !== "") {
      return (
        <div>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row xs="1" sm="2" md="3" lg="2">
                <Col>
                  <Form.Group className="mb-4" controlId="#">
                    <Form.Label>
                      <small className="text">Current Email</small>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="newemail"
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
                      <small className="text">New Email</small>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="newemail"
                      placeholder="example@example.com"
                      required
                      value={values.newemail}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {errors.newemail && (
                    <p className="error">{errors.newemail}</p>
                  )}
                  <br />
                </Col>
              </Row>

              <div className="pb-5">
                <button type='submit' className="btn1" >
                  Update
                  {/* onClick={handleUpdate} */}
                </button>
                <button onClick={handleReset} id="reset" className="btn2">
                  Reset
                </button>
              </div>
            </Form>
          </Container>

          {/* <h3>{organization.email}</h3> */}
        </div>
      );
    } else {
      return <h3>no data</h3>;
    }
  };

  

  return (
    <div className=" mainbody bg-light">
      <Sidebar />
      <div className="container pt-5">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Update Email</div>
        </div>
        {ShowData(props)}
      </div>

      <Notification
                notify={notify}
                setNotify={setNotify}
            />
            
    </div>
  );
}
