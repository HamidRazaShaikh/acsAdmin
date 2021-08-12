import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'



export default function AddUser() {
    return (
        <div className="bg-light">
            <Sidebar />
            
                <div className="container pt-4">
                {/* for Contact */}
                <div className="contact py-5 d-flex justify-content-between">
                    <div className="font-weight-bold h5">User Profile</div>
                    <div className="">
                        {/* <button className="btn btn-primary mx-3 px-4 py-1"></button> */}
                        {/* <Button className="btn btn-warning px-4 py-1" href="/User1"> Edit</Button> */}
                    </div>
                    {/* for Input Feild */}
                </div>


                <Container>
                    <Form>
                    <Row xs="1" sm="2" md="3" lg="2">
                            <Col> <Form.Group className="mb-4" controlId="#">
                                <Form.Label><small className="text">First Name</small></Form.Label>
                                <Form.Control type="Text" Name="address" placeholder="first name" />
                            </Form.Group></Col>
                            <Col> <Form.Group className="mb-4" controlId="#">
                                <Form.Label><small className="text">Middle Name</small></Form.Label>
                                <Form.Control type="Text" Name="address" placeholder="middle name" />
                            </Form.Group></Col>
                            
                        </Row>
                        <Row xs="1" sm="2" md="3" lg="2">
                            <Col> <Form.Group className="mb-4" controlId="#">
                                <Form.Label><small className="text">Last Name</small></Form.Label>
                                <Form.Control type="Text" Name="address" placeholder="last name" />
                            </Form.Group></Col>
                            <Col> <Form.Group className="mb-4 " controlId="#">
                                <Form.Label><small className="text">Date Of Birth</small></Form.Label>
                                <Form.Control type="Text" Name="address" placeholder="dd-mm-year" />
                            </Form.Group></Col>
                            
                        </Row>
                        <Row xs="1" sm="2" md="3" lg="2">
                        <Col> <Form.Group className="mb-4" controlId="#">
                                <Form.Label><small className="text">Place of Birth</small></Form.Label>
                                <Form.Control type="Text" Name="address" placeholder="place of birth" />
                            </Form.Group></Col>
                            <Col> <Form.Group className="mb-4 " controlId="#">
                                <Form.Label><small className="text">Country Of Birth</small></Form.Label>
                                <Form.Control type="Number" Name="address" placeholder="country of birth" />
                            </Form.Group></Col>
                            
                        </Row>
                        <Row xs="1" sm="2" md="3" lg="2">

                            <Col> <Form.Group className="mb-4" controlId="#">
                            <FormControl >
                            <Form.Label><small className="text">Gender</small></Form.Label>
          <RadioGroup className="d-inline ">
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
                            </Form.Group>
                            
                            

                            </Col>
                        </Row>
                        
                        <div className="pb-5">
                            <button className="btn1" href="/User1">Save</button>
                            <button className="btn2">Cancel</button>
                        </div>
                    </Form>
                </Container>
                </div>
            
        </div>

    )
}
