import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios'
import Popup from './popups'
import Addlimit from './addlimit'
import UpdateLimit from './updatelimit'
import Popups from './popup'



////////////////////
function AllLimits() {

  

  const [limits, setlimits] = useState([]);
  const [openPopup, setOpenPopup] = useState(false)
  const [openPopups, setOpenPopups] = useState(false)

  const loadLimits = async () => {
    const response = await axios.get(`/v1/fe/root/med/accesslimit`);
    setlimits(response.data.payload.accessLimit);
  };

  useEffect(() => {
    loadLimits();
  }, []);



    return (
        <div>
        
        
        <div className="mainbody bg-light">
            <Sidebar />
            <div className="container contact py-5 d-flex justify-content-between">
                    <div className="font-weight-bold h5">All Limits</div>
                    <div className="">
                        
                        <Button className="btn btn-primary px-3 py-1" onClick={() => setOpenPopup(true)}>+New</Button>
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
                       
                        < hr className="mb-5" />
                        {/* FOR USER DATA-1 */}
                        {limits.map((location) => {
                          return(
                            <div className="">
                            <Row >
                            <Col>
                                    <p className="">{location.al_service_id}</p>
                                </Col>
                                <Col>
                                    <p className="ml-3">{location.al_max_allowed}</p>
                                </Col>
                               
                                <Col>
                                    <div className="d-flex justify-content-between">
                                        {/* <button className="btn btn-primary px-4 py-1 ">View</button> */}
                                        <Button className="btn btn-primary px-3 py-1 " onClick={() => setOpenPopups(true)} >Update</Button>
                                        
                                    </div>
                                </Col>
                            </Row>
                        </div>
                          )
                        })}
                        
                        <hr />
                        {/* FOR USER DATA-2 */}
                       
                        <hr />
                        {/* FOR USER DATA-3 */}
                        
                        <div className="D-flex my-3">
                            <div className=" showing py-3">
                                <small>Showing 1 - 7 of 25 enteries</small>
                            </div>
                           
                        </div>
                    </Form>
                </Container>



            </div>

        </div >
        < Popup 
        title="New Limit"
         openPopup={openPopup}
         setOpenPopup={setOpenPopup}>
<Addlimit />
           </Popup>

           < Popups 
        title="Update Limit"
         openPopups={openPopups}
         setOpenPopups={setOpenPopups} >
<UpdateLimit />
           </Popups>
        </div>
    )
}

export default AllLimits;
