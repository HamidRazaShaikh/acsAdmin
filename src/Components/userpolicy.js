import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";
import axios from "axios";
import { IoIosReturnLeft } from "react-icons/io";
import ReactLoading from "react-loading";


export default function UserPolicy(props) {
  const [medData, setmedData] = useState([]);
  const [values, setvalues] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [group, setgroup] = useState([]);
  const [policy, setpolicy] = useState([]);
  const [policyg, setpolicyg] = useState([]);
  const [done, setdone] = useState(undefined);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const loadMedData = async () => {
    const response = await axios.get(`/v1/fe/root/usr/users/offset/0`);

    setmedData(response.data.payload.users);
    console.log(id);
     setdone(true);
  };

  const loadGroup = async () => {
    const response = await axios.get(`/v1/fe/root/plsv/group/all`);

    setgroup(response.data.payload.group);
  };

  // const loadPolicy = async () => {
  //   const response = await axios.get(`/v1/fe/root/plsv/role/userid/${id}`);

  //   setpolicy(response.data.payload.policies.policies);

  // };
  const loadPolicyg = async () => {
    const response = await axios.get(`/v1/fe/root/plsv/role/userid/${id}`);

    setpolicyg(response.data.payload.policies);
  };

  useEffect(() => {
    loadMedData();
    loadGroup();
    // loadPolicy()
    loadPolicyg();
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
      .post(`/v1/fe/root/plsv/user`, {
        userId: id,
        groupUUID: values.groupId,
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
  // const done =
  //   policy.map((hi) => {
  //     return(
  // <div>
  //     <h1>{hi.policy_service_id}</h1>
  //     <h1>{hi.policy_service_id}</h1>
  //   </div>
  //     )

  //   })

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
          {policyg.length > 0 ? 
          <div>
            <div className="contact pt-3 d-flex justify-content-between">
              <div className="font-weight-bold h5">
                Group: {policyg.group.group_name}
              </div>
            </div>
            <div className="contact pt-3 pb-3 d-flex justify-content-between">
              <div className="font-weight-bold h5">
                Group Description: {policyg.group.group_description}
              </div>
            </div>
          </div>
          : null}  

          {/* for Input Feild */}
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">New Group</small>
                  </Form.Label>
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
                </Form.Group>
              </Col>
            </Row>

            <div className="pb-5">
              <button className="btn1">Update</button>
              <button className="btn2" onClick={handlecancel}>
                {" "}
                Cancel
              </button>
            </div>
          </Form>
          <div>
            {policyg.length > 0
              ?
             policyg.policies.map((pol) => { 
                  return (
                    <div>
                      <Row xs="2" sm="2" md="2" lg="2">
                        <Col>
                          <p className="ml-2 font-weight-bolder">Resource ID</p>
                          <p className="ml-2 ">{pol.policy_service_id}</p>
                        </Col>
                        <Col className="scrol">
                          <p className="ml-2 font-weight-bolder ">Permission</p>
                          <p className="ml-2 ">{pol.policy_permission_type}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      );
    });

  return (
    <div className="bg-light">
       <Sidebar title="Users" />

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
          {/* <a href="/useremail"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/useremail/${id}`)}
          >
            Email
          </button>
          {/* </a> */}
          {/* <a href="/userpassword"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/userpassword/${id}`)}
          >
            Password
          </button>
          {/* </a> */}
          {/* <a href="/useraccess"> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/useraccess/${id}`)}
          >
            Access
          </button>
          {/* </a> */}{" "}
          <button
            className="btn01"
            //onClick={() => history.push(`/userpolicy/${id}`)}
          >
            Policy
          </button>{" "}
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
      {!done ? (
          <ReactLoading
            type={"bubbles"}
            color={"grey"}
            height={120}
            width={320}
            className="loader"
          />
        ) : (
          dot
        )}
        {/* {done} */}
      </Container>
      {/* <div className=" UserID1 bg-white mt-3  pt-3  ">
        <Container className="shadow pb-5">
          FOR USER DATA-1

          <hr />
        </Container>
      </div> */}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
