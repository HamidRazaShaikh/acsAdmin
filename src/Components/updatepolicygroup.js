import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import AddResourcelimit from './addresourcelimit'
import PopupResource from './popupresource'
import Notification from "./message";







export default function PolicyGroup() {
  const [depatrments, setdepartments] = useState([]);
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [data, setdata] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const [medicals, setmedicals] = useState([]);
  
  const [openPopupx, setOpenPopupx] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });




  const loadLocations = async () => {
    const response = await axios.get("/v1/fe/root/org/department/all");
    setdepartments(response.data.payload.departments);
  };

  const loadgroup = async () => {
    const response = await axios.get(`/v1/fe/root/plsv/group/policy/${id}`);
    console.log(id)
    setmedicals(response.data.payload.groups);

  };

// const getData = () => {
//     axios
//       .get(`/v1/fe/root/org/department/${id}`)
//       .then((response) => {
//         const Alldata = response.data.payload.department;
// // console.log(Alldata)
// setmedicals(Alldata);
//       })
//       .catch((error) => console.error(`Error: ${error}`));
//   };

  const getResource = () => {
    axios
      .get(`/v1/fe/root/plsv/policy/cache/all`)
      .then((response) => {
        const Alldata = response.data.payload.policies;
// console.log(Alldata)
setdata(Alldata);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    loadgroup()
    // getData()
    loadLocations();
    getResource()
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
    history.push("/allpolicygroup");
  };

///////////////////PUT Method///////////////////////////////

  const PutPolicyGroup = () => {
    axios
      .put(`/v1/fe/root/plsv/group`, {
        id: 13, 
        uuid: "372cb886-32fb-487b-b503-5fcd4e18d0a9",
        departmentId: values.deptId,
        name: values.name,
        description: values.description
      })
      .then((response) => {
        //alert("Data Submited Succcessfully");
        setNotify({
          isOpen: true,
          message: "Updated Succcessfully",
          type: "success",
        });
        console.log(response.status);
        setdata(response.data);
        
        if (!data) return "No post!";
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Failed To Update",
          type: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //seterrors(validationLocationProfile(values));
    PutPolicyGroup();
  };

  return (
    <div className="bg-light">
      <Sidebar />

      <div className="container pt-4">
        {/* for Contact */}
        <div className="contact py-5 d-flex justify-content-between">
          <div className="font-weight-bold h5">Policy Group</div>

          {/* for Input Feild */}
        </div>

        <Container>
          <Form onSubmit={handleSubmit}>
            {/* <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Department</small>
                  </Form.Label>
                  {/* <Form.Control type="Text" name="department" placeholder="department" /> */}
                  {/* <select
                    name="id"
                    value={values.id}
                    onChange={handleChange}
                    className="shadow drpdown"
                    placeholder=""
                  >
                    {depatrments.map((location, index) => (
                      <option value={location.department_profile_id}>
                        {location.department_profile_name}{" "}
                        {location.department_profile_id}
                      </option>
                    ))}
                  </select>
                  <br /> */}
                {/* </Form.Group>
              </Col>
            </Row> */} 
                      {/* ////////////////////////// */}

                      {medicals.map((location) => {
                        return( 
                          <div>
                            <Row xs="1" sm="2" md="3" lg="2">
            
            <Col className="w-100">
              {" "}
                    <h2>Existing Department: <span className="text-primary"> {location.department.department_profile_name}</span></h2>
                  {/* <h4 className="text"> {organization.location_profile_id} {organization.location_profile_city}
                 <br /></h4> */}
                
              <br />
            </Col>
           
          </Row>

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

                          <Row xs="1" sm="2" md="3" lg="2">
                          <Col>
                            {" "}
                            <Form.Group className="mb-4" controlId="#">
                              <Form.Label>
                                <small className="text">Department</small>
                              </Form.Label>
                              {/* <Form.Control type="Text" name="department" placeholder="department" /> */}
                              <select
                                name="deptId"
                                value={values.deptId}
                                onChange={handleChange}
                                className="shadow drpdown"
                                
                              >
                                {depatrments.map((location, index) => (
                                  <option value={location.department_profile_id}>
                                    {location.department_profile_name}{" "}
                                    {location.department_profile_id}
                                  </option>
                                ))}
                              </select>
                              <br />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row xs="1" sm="2" md="3" lg="2">
                        <Col>
                          {" "}
                          <Form.Group className="mb-4" controlId="#">
                            <Form.Label>
                              <small className="text"> Group ID</small>
                            </Form.Label>
                            <Form.Control
                              type="Text"
                              name="groupid"
                              placeholder={location.group_id}
                              value={values.groupid}
                              onChange={handleChange}
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
                              <small className="text"> Name</small>
                            </Form.Label>
                            <Form.Control
                              type="Text"
                              name="name"
                              placeholder={location.group_name}
                              value={values.name}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
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
                              placeholder={location.group_description}
                              value={values.description}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      </div>
                      )
                        
                      

                      })}

           

            <div className="pb-5">
              <button className="btn1">Update</button>
              <button className="btn2" onClick={handlecancel}> Cancel</button>
            </div>
          </Form>
        </Container>
      </div>
{/* /////////////////////////// ALL LIMIT SECTION */}
      <div>
         {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
    
        
        <div className="mainbody bg-light">
           
            <div className="container contact py-5 d-flex justify-content-between">
                    <div className="font-weight-bold h5">All Limits</div>
                    <div className="">
                        
                        <Button className="btn btn-primary px-3 py-1" onClick={() => setOpenPopupx(true)}>+New</Button>
                    </div>
                    
                </div>
            
            <div className="container UserID bg-white mt-3 pt-3">
                <Container className=" shadow ">
                    <Form>
                        <div className="scrol">
                            {/* FOR USER ID */}
                            <Row  >
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
                          return(
                            <div className="">
                            <Row >
                                <Col>
                                        <p className="">{policy.service_id}</p>
                                    </Col>
                                    <Col>
                                        <p className="ml-3">{policy.permission_type}</p>
                                    </Col>
                                   
                                    <Col>
                                        <div className="d-flex justify-content-between">
                                            {/* <button className="btn btn-primary px-4 py-1 ">View</button> */}
                                            <Button className="btn btn-primary px-3 py-1 "  >Delete</Button>
                                            
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                          )
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

        </div >
        </div>
        <PopupResource title="Add Resource"
         openPopupx={openPopupx}
         setOpenPopupx={setOpenPopupx}>

           <AddResourcelimit uuid={id}/>
         </PopupResource>
        

         <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
