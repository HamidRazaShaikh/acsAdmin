import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";

function UpdateMedicalProcedure(props) {
  const [medicals, setmedicals] = useState([]);
  const [medData, setmedData] = useState([]);
  const [values, setvalues] = useState({});
  const [dept_id, setdept_id] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const loadMedData = async () => {
    const response = await axios.get(`/v1/fe/root/org/medical/all`);
    setmedData(response.data.payload.procedures);
    console.log(id);
    response.data.payload.procedures
      .filter((meds) => {
        return id == meds.medical_procedure_id;
      })
      .map((med) => {
        setdept_id(med.department_profile_id);
        console.log(med.department_profile_id);
      });
  };

  const loadDepartments = async () => {
    const response = await axios.get(`/v1/fe/root/org/department/all`);
    setmedicals(response.data.payload.departments);
  };

  useEffect(() => {
    loadMedData();
    loadDepartments();
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
    history.push("/allmedicalprocedure");
  };
  /////////////////////////////
  const UpdateMedical = () => {
    axios
      .put(`/v1/fe/root/org/procedure`, {
        id: id,
        departmentId: dept_id,
        label: values.label,
        name: values.name,
        description: values.description,
        types: values.type,
        cost: values.cost,
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
  /////////////////////
  const dot = medData
    .filter((meds) => {
      return id == meds.medical_procedure_id;
    })
    .map((meds) => {
      return (
        <div>
          <Form onSubmit={handleSubmit}>
            <hr className="mb-5" />
            {/* FOR USER DATA-1 */}

            <Row xs="1" sm="2" md="3" lg="2">
              <Col>
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Department</small>
                  </Form.Label>

                  <Form.Control
                    type="Text"
                    name="location"
                    placeholder={meds.department_profile_name}
                    // value={values.location}
                    // onChange={handleChange}
                    readOnly
                  />

                  <br />
                </Form.Group>
                {/* {errors.location && <p className="error">{errors.location}</p>} */}

                <br />
              </Col>
            </Row>

            <Row xs="1" sm="2" md="3" lg="2">
              <Col className="d-none">
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Procedure ID</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="medid"
                    placeholder={meds.medical_procedure_id}
                    value={values.medid}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* {errors.name && <p className="error">{errors.name}</p>} */}
                <br />
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Procedure Label</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="label"
                    placeholder={meds.medical_procedure_label}
                    value={values.label}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {/* {errors.name && <p className="error">{errors.name}</p>} */}
                <br />
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Procedure Name</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="name"
                    placeholder={meds.medical_procedure_name}
                    value={values.name}
                    onChange={handleChange}
                    required
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
                    <small className="text">Procedure Description</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="description"
                    placeholder={meds.medical_procedure_description}
                    value={values.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-4" controlId="#">
                  <Form.Label>
                    <small className="text">Procedure Type</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="type"
                    placeholder={meds.medical_procedure_types}
                    value={values.type}
                    onChange={handleChange}
                    required
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
                    <small className="text">Procedure Cost</small>
                  </Form.Label>
                  <Form.Control
                    type="Text"
                    name="cost"
                    placeholder={meds.medical_procedure_cost}
                    value={values.cost}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>{" "}
                <br />
              </Col>
            </Row>

            <div className="pb-5 pt-3">
              <button className="btn1">Update</button>
              <button className="btn2" onClick={handlecancel}>
                Cancel
              </button>
            </div>
            <hr />
            {/* FOR USER DATA-2 */}
          </Form>
        </div>
      );
    });

  return (
    <div className="mainbody bg-light">
      <Sidebar title="Organization"/>
      <div className="fluid">
        <h4 className="page3">Medical Procedure</h4>
      </div>
      <div className=" UserID bg-white mt-3 pt-4">
        <Container>{dot}</Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default UpdateMedicalProcedure;
