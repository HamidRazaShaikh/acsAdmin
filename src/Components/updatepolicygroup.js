import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import AddResourcelimit from "./addresourcelimit";
import PopupResource from "./popupresource";
import Notification from "./message";

export default function PolicyGroup() {
  const [depatrments, setdepartments] = useState([]);
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [ids, setids] = useState("")
  const [data, setdata] = useState([]);
  const history = useHistory();
  const { id } = useParams();
 
  const [medicals, setmedicals] = useState([]);

  const [openPopupx, setOpenPopupx] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // const loadLocations = async () => {
  //   const response = await axios.get("/v1/fe/root/org/department/all");
  //   setdepartments(response.data.payload.departments);
  // };

  const loadgroup = async () => {
    const response = await axios.get(`/v1/fe/root/plsv/group/policy/${id}`);
    console.log(id);
    setmedicals(response.data.payload.groups);
  };

  

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
    loadgroup();
    // getData()
    // loadLocations();
    getResource();
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
        departmentId: values.department,
        id: values.groupid,
        name: values.name,
        description: values.description,
        uuid: id,
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
          message: `Failed To Update${err}`,
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
            
            {/* ////////////////////////// */}

            {medicals.map((location) => {
               
              return (
                <div>
                 
               

                  <br />
                  

                  <Row xs="1" sm="2" md="3" lg="2" >
                    <Col>
                      {" "}
                      <Form.Group className="mb-4" controlId="#">
                        <Form.Label>
                          <small className="text">Department</small>
                        </Form.Label>
                        <Form.Control
                          type="Text"
                          name="department"
                          defaultValue={location.group_department_id}
                         
                          value={values.department}
                          
                          onChange={handleChange}
                        />
                        {/* <select
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
                              </select> */}
                        <br />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row xs="1" sm="2" md="3" lg="2">
                    <Col className="">
                      {" "}
                      <Form.Group className="mb-4" controlId="#">
                        <Form.Label>
                          <small className="text"> Group ID</small>
                        </Form.Label>
                        <Form.Control
                          type="Text"
                          name="groupid"
                          // placeholder={location.group_id}
                          defaultValue={location.group_id}
                          value={values.groupid}
                          onChange={handleChange}
                         
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
                          defaultValue={location.group_name}
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
                          defaultValue={location.group_description}
                          value={values.description}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              );
            })}

            <div className="pb-5">
              <button className="btn1">Update</button>
              <button className="btn2" onClick={handlecancel}>
                {" "}
                Cancel
              </button>
            </div>
          </Form>
        </Container>
      </div>
      {/* /////////////////////////// ALL LIMIT SECTION */}
     
      <PopupResource
        title="Add Resource"
        openPopupx={openPopupx}
        setOpenPopupx={setOpenPopupx}
      >
        <AddResourcelimit uuid={id} />
      </PopupResource>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}