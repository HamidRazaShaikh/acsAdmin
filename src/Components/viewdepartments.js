import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

const ViewDepartment = () => {
    return (
        <div className="mainbody bg-light">
            <Sidebar />
            <div className="container contact py-5  d-flex justify-content-between">
                    <div className="font-weight-bold h5">Department Profile</div>
                    
                    
                </div>
            
            <div className=" UserID1 bg-white mt-3  pt-3  ">
                <Container className="shadow pb-5">
                    
                        
                        
                        {/* FOR USER DATA-1 */}
                        <div >
                        <Row xs="2" sm="2" md="2" lg="2">
                                
                                <Col>
                                    <p className="ml-2 font-weight-bolder">Location:</p>
                                </Col>
                                <Col className="scrol">
                                    <p className="ml-2 pr- ">Iris Watson
                                P.O. Box 283 8562 Fusce Rd.
                                Frederick Nebraska 20620
                                (372) 587-2335</p>
                                </Col>
                                
                            </Row>
                        </div>
                        <hr />
                        {/* FOR USER DATA-2 */}
                        <div className="scrol">
                            <Row >
                                
                                <Col>
                                    <p className="ml-2 font-weight-bolder">Label:</p>
                                </Col>
                                <Col>
                                    <p className="ml-2">label</p>
                                </Col>
                                
                            </Row>
                        </div>
                        
                        <hr />
                        {/* FOR USER DATA-3 */}
                        <div className="scrol">
                        <Row >
                                
                                <Col>
                                    <p className="ml-2 font-weight-bolder">Name:</p>
                                </Col>
                                <Col>
                                    <p className="ml-2">name</p>
                                </Col>
                                
                            </Row>
                        </div>
                        <hr />
                        
                   
                        {/* FOR USER DATA-4 */}
                        <div className="scrol pb-4">
                        <Row xs="2" sm="2" md="2" lg="2">
                                
                                <Col>
                                    <p className="ml-2 font-weight-bolder">Description</p>
                                </Col>
                                <Col>
                                    <p className="ml-2">Normally  components will render a HTML  element.
                                         However you can render whatever you'd like, adding a href prop will automatically render an  element. You can use the as prop to render whatever your heart desires.
                                     React Bootstrap will take care of the proper ARIA roles for you.</p>
                                </Col>
                                
                            </Row>
                        </div>
                        <hr />
                        
                   
                      
                    
                </Container>



            </div>

        </div >
    )
}

export default ViewDepartment
