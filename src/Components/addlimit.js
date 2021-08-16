import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";

function Addlimit() {
  const [locations, setlocations] = useState([]);
  const [ID, setID] = useState([]);
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [organization, setorganization] = useState("");
  const [data, setdata] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handlecancel = () => {
    history.push("/alldepartments");
  };

  const loadID = async () => {
    const response = await axios.get("/v1/fe/root/med/resources");
    setID(response.data.payload.resources);
  };

  useEffect(() => {
    loadID();
  }, []);

  const PostLimit = () => {
      axios
      .post(`/v1/fe/root/med/accesslimit`, {
       serviceId: values.ids,
        maxAllowed: values.limit

      })
      .then((response) => {
       // alert("Data Submited Succcessfully");
        setNotify({
          isOpen: true,
          message: "Data Submited Succcessfully",
          type: "success",
        });
        console.log(response.status);
        setdata(response.data);
        console.log(data)
        if (!data) return "No post!";
      })
      .catch((err) =>
      {setNotify({
        isOpen: true,
        message: `Failed To Update${err}`,
        type: "error",
      });
  })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
     //seterrors(validationLocationProfile(values));
     PostLimit();
    };

  return (
    <div className=" bg-light">
      
      <div className=" UserID bg-white  ">
      <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
            <small className="text"> Resource ID</small>
            </Row>
            <Row >
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    
                  </Form.Label>
                  {/* <Form.Control
                    type="Text"
                    name="name"
                    placeholder=" name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  /> */}
                   <select
                    name="ids"
                    value={values.ids}
                    onChange={handleChange}
                    className="shadow drpdowno"
                  >
                    {ID.map((ids, index) => (
                      <option value={ids}>
                        {ids} 
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Col>
            </Row>

            <Row >
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Request Limit</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="limit"
                    placeholder="Limit"
                    value={values.limit}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="pb-1 ">
              <button className="btn1">Save</button>
              <button className="btn2 " onClick={handlecancel}> Reset</button>
            </div>
          </Form>
        </Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Addlimit;
