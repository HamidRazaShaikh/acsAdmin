import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import {useHistory, useParams } from 'react-router-dom'
import Notification from './message'
import ReactLoading from "react-loading";

function AllLocations() {
  const [locations, setlocations] = useState([]);
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [organization, setorganization] = useState("");
 const [data, setdata] = useState("");
  const history = useHistory()
  const { id } = useParams();
  const [loc_id, setloc_id] = useState("");
  const [done, setdone] = useState(undefined);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


  

  const getData = () => {
    axios
      .get(`/v1/fe/root/org/department/${id}`)
      .then((response) => {
        const Alldata = response.data.payload.department;
// console.log(Alldata)
        setorganization(Alldata);
        console.log(Alldata.location_profile_id)

        setloc_id(Alldata.location_profile_id)
        setdone(true);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const departmentUpdate =  <Container>
  <Form onSubmit={handleSubmit}>
    <hr className="mb-5" />
    {/* FOR USER DATA-1 */}

    <Row xs="1" sm="2" md="3" lg="2" className="d-none">
    <Col className="d-none">
        {" "}
        <Form.Group className="mb-4" controlId="#">
          <Form.Label>
            <small className="text">Existing Department</small>
          </Form.Label>
          <Form.Control
           
            // value={organization.department_profile_id}
           
            // placeholder={organization.department_profile_id}
            
            // required
          />
        </Form.Group>
        {errors.email && <p className="error">{errors.email}</p>}
        <br />
      </Col>
      <Col className="w-100">
        {" "}
              <h2>Existing Location: <span className="text-primary"> {organization.location_profile_city}-{organization.location_profile_state}</span></h2>
            {/* <h4 className="text"> {organization.location_profile_id} {organization.location_profile_city}
           <br /></h4> */}
          
        <br />
      </Col>
     
    </Row>
    <Row xs="1" sm="2" md="3" lg="2">
    
      <Col>
        <Form.Group className="mb-4" controlId="#">
          <Form.Label>
            <small className="text">Location</small>
          </Form.Label>

          <Form.Control
            type="Text"
            name="location"
            placeholder={organization.location_profile_city}
            // value={values.location}
            // onChange={handleChange}
            // required
            readOnly
          />
          
          {/* <select name="id" value={values.id } onChange={handleChange} className="shadow drpdown">
            {locations.map((location, index) => (
              <option value={location.id}>
                 {" "}
                {location.address}-{location.city} {" "}
                {location.id}
              </option>
            ))}
          </select> */}
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
            placeholder={organization.department_profile_name}
            value={values.name}
            onChange={handleChange}
            
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
            placeholder={organization.department_profile_label}
            value={values.label}
            onChange={handleChange}
           
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
            placeholder={organization.department_profile_description}
            value={values.description}
            onChange={handleChange}
            
          />
        </Form.Group>{" "}
        <br />
      </Col>
    </Row>

    <div className="pb-5 pt-3">
      <button className="btn1">Update</button>
      <button className="btn2" onClick={handlecancel}>Cancel</button>
    </div>
    <hr />
    {/* FOR USER DATA-2 */}
  </Form>
</Container>

  const loadLocations = async () => {
    const response = await axios.get(
      `/v1/fe/root/org/location/all`
    );
    setlocations(response.data.payload.locations);
  };

  useEffect(() => {
    getData();
    loadLocations()
  }, []);

  

  
  const handleChange = (e) => {
   
   
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
    
  };

  const handlecancel = () => {
    history.push('/alldepartments')
    }

    const PutDepartmentProf = () => {
        axios
        .put(`/v1/fe/root/org/department`, {
            id: organization.department_profile_id,
            locationId: loc_id,
            label: values.label,
            name: values.name,
            description: values.description
          
        })
        .then((response) => {
          // alert("Data Submited Succcessfully");
          setNotify({
            isOpen: true,
            message: 'Updated Successfully',
            type: 'success'
        })
          console.log(response.status);
          setdata(response.data);
          // console.log(data)
          if (!data) return "No post!";
        })
        .catch((err) => 
        {
          setNotify({
            isOpen: true,
            message: 'Failed To Update data',
            type: 'error'
        })
    })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       //seterrors(validationLocationProfile(values));
       PutDepartmentProf();
      };
    

  return (
    <div className="mainbody bg-light">
      <Sidebar />
      <div className="fluid">
        <h4 className="page3">Department Profile</h4>
      </div>
      <div className=" UserID bg-white mt-3 pt-4">
      {!done ? (
                <ReactLoading
                  type={"bubbles"}
                  color={"grey"}
                  height={120}
                  width={320}
                  className="loader"
                />
              ) : (
                departmentUpdate
              )}
      
      </div>
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
  );
}

export default AllLocations;
