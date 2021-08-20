import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";
import axios from "axios";
import ReactLoading from "react-loading";

export default function UserStatus(props) {
  const [medData, setmedData] = useState([]);
  const [values, setvalues] = useState({});
  const history = useHistory();
  const { id } = useParams();
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

  useEffect(() => {
    loadMedData();
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
        userId: id,
        access: values.status,
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
          <div className="contact py-5 d-flex justify-content-between">
            <div className="font-weight-bold h5">User ID: {id}</div>

            {/* for Input Feild */}
          </div>
          <Form onSubmit={handleSubmit}>
            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Status</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="status"
                    placeholder={meds.ua_access}
                    value={values.status}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="pb-5">
              <button className="btnx1">Allow</button>
              <button className="btn2" onClick={handlecancel}>
                Cancel
              </button>
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
          {/* <a href="/useremail"> */} <button className="btn02">Email</button>
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
            className="btn01"
            //onClick={() => history.push(`/useraccess/${id}`)}
          >
            Access
          </button>
          {/* </a> */}{" "}
          <button
            className="btn02"
            onClick={() => history.push(`/userpolicy/${id}`)}
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
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
