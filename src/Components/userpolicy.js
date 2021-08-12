import React, { useState, useEffect } from "react"; 
import { Container, Row, Col, Form} from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";
import axios from "axios";




export default function UserPolicy(props) {

    const [medData, setmedData] = useState([]);
  const [values, setvalues] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [group, setgroup] = useState([]);
  const [policy, setpolicy] = useState([]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const loadMedData = async () => {
    const response = await axios.get(`/v1/fe/root/usr/users/offset/0`);

    setmedData(response.data.payload.users);
    console.log(id);
  };

  const loadGroup = async () => {
    const response = await axios.get(`/v1/fe/root/plsv/group/all`);

    setgroup(response.data.payload.group);
    
  };

  const loadPolicy = async () => {
    const response = await axios.get(`/v1/fe/root/plsv/role/userid/${id}`);

    setpolicy(response.data.payload.policies);
    
  };


  useEffect(() => {
    loadMedData();
    loadGroup()
    loadPolicy()
  }, []);

  const handleChange = (e) => {
    e.persist();
    //seterrors(validationemail(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handlecancel = () => {
    history.push("/allusers");
  };
  /////////////////////////////
  const UpdateMedical = () => {
    axios
      .put(`/v1/fe/root/usr/user/account/access`, {
        userId : id,
    groupUUID: values.groupId
      })
      .then((response) => {
        //alert("Data Updated Succcessfully");
        setNotify({
          isOpen: true,
          message: "Updated Succcessfully",
          type: "success",
        });
        console.log(response.status);
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

    UpdateMedical();
  };

  const dot = medData
    .filter((meds) => {
      return id == meds.ua_user_id;
    })
    .map((meds) => {
      return (
        <div>
          <div className="contact pt-5  d-flex justify-content-between">
                    <div className="font-weight-bold h5">User ID: {id}</div>
                </div>
                <div className="contact pt-3 d-flex justify-content-between">
                <div className="font-weight-bold h5">Group: Developer</div>
                </div>
                <div className="contact pt-3 pb-3 d-flex justify-content-between">
                <div className="font-weight-bold h5">Group Description: Dev ER</div>
                </div>
                {/* for Input Feild */}
                    <Form onSubmit={handleSubmit}>
                    <Row xs="1" sm="2" md="3" lg="2">
                            <Col> <Form.Group className="mb-4" controlId="#">
                                <Form.Label><small className="text">New Group</small></Form.Label>
                                {/* <Form.Control type="email" Name="address" placeholder="new group" /> */}
                                <select
                                name="groupId"
                                value={values.groupId}
                                onChange={handleChange}
                                className="shadow drpdown"
                                
                              >
                                {group.map((location, index) => (
                                  <option value={location.group_uuid}>
                                    {location.group_name}{" "}
                                   
                                  </option>
                                ))}
                              </select>
                            </Form.Group></Col>
                           
                            
                      </Row>
                        
                        
                        <div className="pb-5">
                            <button className="btn1">Update</button>
                            <button className="btn2" onClick={handlecancel}> Cancel</button>
                        </div>
                    </Form>
        </div>
      );
    });

    return (
        <div className="bg-light">
            <Sidebar />
        
                 <div className="container-fluid d-flex justify-content-center pt-4 upbton">
        <Row>
          {/* <a href="/userdetailprofile"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/userdetailprofile/${id}`)}
          >
            Profile
          </button>
          {/* </a> */}
          {/* <a href="/usercontact"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/usercontact/${id}`)}
          >
            Contact
          </button>
          {/* </a> */}
          {/* <a href="/useremail"> */} <button className="btn02" onClick={() => history.push(`/useremail/${id}`)}
          >Email</button>
          {/* </a> */}
          {/* <a href="/userpassword"> */}{" "}
          <button
            className="btn02"
             onClick={() => history.push(`/userpassword/${id}`)}
          >
            Password
          </button>
          {/* </a> */}
          {/* <a href="/useraccess"> */}
            {" "}
            <button
            className="btn02"
            onClick={() => history.push(`/useraccess/${id}`)}
          >
            Access
          </button>
          {/* </a> */}
         
            {" "}
            <button
            className="btn01"
            //onClick={() => history.push(`/userpolicy/${id}`)}
          >
            Policy
          </button>
          
        
            {" "}
            <button
            className="btn02"
            onClick={() => history.push(`/userdepartment/${id}`)}
          >
            Department
          </button>
          
        </Row>
      </div>
                {/* for Contact */}
                


                <Container>
                
                   {dot}
                    
                </Container>
                <div className=" UserID1 bg-white mt-3  pt-3  ">
                <Container className="shadow pb-5">
                    
                        
                        
                        {/* FOR USER DATA-1 */}
                        
                               
                        
                        <div >
                        <Row xs="2" sm="2" md="2" lg="2">
                                
                                <Col>
                                    <p className="ml-2 font-weight-bolder">Resource ID</p>
                                    <p className="ml-2 ">MED-CHAR-LOG</p>
                                    <p className="ml-2 ">MED-CHAR-HR</p>

                                </Col>
                                <Col className="scrol">
                                    <p className="ml-2 font-weight-bolder ">Permission</p>
                                    <p className="ml-2 ">Read</p>
                                    <p className="ml-2 ">Write</p>
                                </Col>
                                
                            </Row>
                        </div>
                        <hr />
                       
                       
                        
                   
                      
                    
                </Container>



            </div>
            <Notification notify={notify} setNotify={setNotify} />
                </div>
            
        
      

    )
}
