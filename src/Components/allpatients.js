import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
//import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";



function Allpatients() {

  const [page, setpage] = useState(1);
  const [searchTerm, setsearchTerm] = useState("");
  const [locations, setlocations] = useState([]);

  const loadLocations = async () => {
    const response = await axios.get(
      `/v1/fe/root/org/location/all?_page=${page}`
    );
    setlocations(response.data.payload.locations);
  };

  useEffect(() => {
    loadLocations();
  }, [page]);


  return (
    <div className="mainbody bg-light">
      <Sidebar />
      <div className="fluid">
        <h4 className="page3">All Locations</h4>
      </div>
      <div className="UserID bg-white mt-3 pt-4">
        <div className="container bg-white">
          <Table responsive="sm">
            <tr>
              <th>Email</th>
              <th>Adress</th>
              <th>City</th>
              <th>Zip&nbsp;Code</th>
              <th>State/Province</th>
              <th className="">Action</th>
            </tr>
            <hr />
            <tbody>
            <tr>
                                <td> <input type="Search" className="SearchBox " name="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)}/></td>
                                <td> <input type="Search" className="SearchBox " ame="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)}/></td>
                                <td> <input type="Search" className="SearchBox " name="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)} /></td>
                                <td> <input type="Search" className="SearchBox " name="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)} /></td>
                                <td> <input type="Search" className="SearchBox " name="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)} /></td>
                            </tr>

                           
                            {locations.filter((location) => {
                if (searchTerm === "") {
                  return locations;
                } else if (
                  location.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return locations;
                } else if (
                  location.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return locations;
                } else if (
                  location.city.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return locations;
                }
                // else if(location.zip_code.includes(searchTerm))
                // {
                //     return locations
                // }
                else if (
                  location.state
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return locations;
                }
              })
                  .map((location, index) => {
                    
                    return (
                      
                      //<div className="" key={location.id}>
                       <tr>
                                <td >{location.email}</td>
                                <td className="w-25" >{location.address}</td>
                                <td >{location.city}</td>
                                <td >{location.zip_code}</td>
                                <td >{location.state}</td>
                                <td><Link
                          class="btn btn-primary px-4 py-1 mx-2"
                          to={`/locationprofileupdate/${location.id}`}
                        >
                          View
                        </Link></td>
                                <td><Link
                          class="btn btn-warning px-4 py-1 mx-2"
                          to={`/locationprofileupdate/${location.id}`}
                        >
                          Edit
                        </Link></td>
                                </tr>
                                //</div>
                               
                                );
                                
                              })} 
                              
                                
                {/* {locations
                  .map((location, index) => {
                    return (
                      <tr>
                      <div className="scrol" key={location.id}>
                        <td>{location.email}</td>
                        <td>{location.address}</td>
                        <td>{location.city}</td>
                        <td >{location.zip_code}</td>
                        <td >{location.state}</td>

                        <td> <Link
                          class="btn btn-primary px-4 py-1 mx-2"
                          to={`/locationprofileupdate/${location.id}`}
                        >
                          View
                        </Link></td>
                        <td><Link
                          class="btn btn-warning px-4 py-1 mx-2"
                          to={`/locationprofileupdate/${location.id}`}
                        >
                          Edit
                        </Link></td>
                       

                      </div>
                      </tr>
                    );
                  })} */}
              

            </tbody>
          </Table>
        </div>
      </div>
    </div >
  )
}


export default Allpatients
