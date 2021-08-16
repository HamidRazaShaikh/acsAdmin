 {/* <Row xs="1" sm="2" md="3" lg="2">
            
            <Col className="w-100">
              {" "}
                    <h2>Existing Department: <span className="text-primary"> {location.department.department_profile_name}</span></h2>
                  {/* <h4 className="text"> {organization.location_profile_id} {organization.location_profile_city}
                 <br /></h4> */}


                 {/* </Col> */}

                  {/* </Row> */}

                  {/* <Row xs="1" sm="2" md="3" lg="2" 
                      className="d-none"
                      >
                        <Col>
                          {" "}
                          <Form.Group className="mb-4" controlId="#">
                            <Form.Label>
                              <small className="text"> ID</small>
                            </Form.Label>
                            <Form.Control
                              type="Text"
                              name="id"
                              placeholder={location.policy_id}
                              value={values.id}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row> */}
                      /////////////////////


                      <div>
                      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                      Open dialog
                    </Button> */}
              
                      <div className="mainbody bg-light">
                        <div className="container contact py-5 d-flex justify-content-between">
                          <div className="font-weight-bold h5">All Limits</div>
                          <div className="">
                            <Button
                              className="btn btn-primary px-3 py-1"
                              onClick={() => setOpenPopupx(true)}
                            >
                              +New
                            </Button>
                          </div>
                        </div>
              
                        <div className="container UserID bg-white mt-3 pt-3">
                          <Container className=" shadow ">
                            <Form>
                              <div className="scrol">
                                {/* FOR USER ID */}
                                <Row>
                                  <Col>
                                    <p className="font-weight-bold ">Resource ID</p>
                                  </Col>
                                  <Col>
                                    <p className="font-weight-bold ">Permission</p>
                                  </Col>
              
                                  <Col>
                                    <p className="font-weight-bold ">Action</p>
                                  </Col>
                                </Row>
                              </div>
                              <hr />
              
                              {/* FOR USER DATA-1 */}
              
                              {/* FOR USER DATA-2 */}
                              {data.map((policy) => {
                                return (
                                  <div className="">
                                    <Row>
                                      <Col>
                                        <p className="">{policy.service_id}</p>
                                      </Col>
                                      <Col>
                                        <p className="ml-3">{policy.permission_type}</p>
                                      </Col>
              
                                      <Col>
                                        <div className="d-flex justify-content-between">
                                          {/* <button className="btn btn-primary px-4 py-1 ">View</button> */}
                                          <Button className="btn btn-primary px-3 py-1 ">
                                            Delete
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                );
                              })}
              
                              <hr />
                              {/* FOR USER DATA-3 */}
              
                              {/* <div className="D-flex my-3">
                                          <div className=" showing py-3">
                                              <small>Showing 1 - 7 of 25 enteries</small>
                                          </div> */}
              
                              {/* </div> */}
                            </Form>
                          </Container>
                        </div>
                      </div>
                    </div>