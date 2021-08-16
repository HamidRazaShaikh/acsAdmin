import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios'
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";



function AllMedicalProcedure() {
   
  const [searchTerm, setsearchTerm] = useState("");
  const [departments, setdepartments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [done, setdone] = useState(undefined);


    const loadLocations = async () => {
        const response = await axios.get(
          `/v1/fe/root/org/department/all`
        );
        setdepartments(response.data.payload.departments);
        setdone(true);

      };
    
      useEffect(() => {
        loadLocations();
      }, []);

      const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = departments
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter((location) => {
      if (searchTerm === "") {
        return departments;
      } else if (
        location.department_profile_label.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return departments;
      } else if (
        location.department_profile_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return departments;
      } else if (
        location.location_profile_state.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return departments;
      }
      else if (
        location.location_profile_city.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return departments;
      }
      else if(location.location_profile_zip_code.includes(searchTerm))
      {
          return departments
      }
      else if (
        location.location_profile_state.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return departments;
      }
      
    })
    .map((location, index) => {
                    
      return (
        
        //<div className="" key={location.id}>
         <tr>
                  <td >{location.department_profile_label}</td>
                  <td  >{location.department_profile_name}</td>
                  <td >{location.location_profile_state}</td>
                  <td >{location.location_profile_city}</td>
                  <td >{location.location_profile_zip_code}</td>
                  <td >{location.location_profile_state}</td>
                  <td><Link
            class="btn btn-primary px-4 py-1 "
            to={`/departmentprofileupdate/${location.department_profile_id}`}
          >
            View
          </Link></td>
                  <td><Link
            class="btn btn-warning px-4 py-1 "
            to={`/departmentprofileupdate/${location.department_profile_id}`}
          >
            Edit
          </Link></td>
                  </tr>
                  //</div>
                 
                  );
                  
                });
  const pageCount = Math.ceil(departments.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

    return (
      <div className="mainbody bg-light">
      <Sidebar />
      <div className="container contact py-5 d-flex justify-content-between">
                    <div className="font-weight-bold h5">All Departments</div>
                    <div className="">
                        
                        <Button className="btn btn-primary px-3 py-1" href="/departmentprofile">+New</Button>
                    </div>
                    
                </div>
      <div className="UserID bg-white mt-3 pt-4">
        <div className="container bg-white">
          <Table responsive="sm">
            <tr>
              <th>Label</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Zip&nbsp;Code</th>
              <th>State/Province</th>
              <th className="d-flex justify-content-center">Action</th>
            </tr>
           
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
                                <td> <input type="Search" className="SearchBox " name="zip"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)} /></td>
                    <td> <input type="Search" className="SearchBox " name="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)} /></td>
                            </tr>

                            {!done ? (
                <ReactLoading
                  type={"bubbles"}
                  color={"grey"}
                  height={120}
                  width={320}
                  className="loader"
                />
              ) : (
                displayUsers
              )}
                            

              <div>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns "}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
                {/* <p>Showing {pagesVisited + usersPerPage}of{departments.length } entries</p> */}
              </div>
                            {/* {departments.filter((location) => {
                if (searchTerm === "") {
                  return departments;
                } else if (
                  location.department_profile_label
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return departments;
                } else if (
                  location.department_profile_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return departments;
                } else if (
                  location.location_profile_state.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return departments;
                }
                else if (
                  location.location_profile_city
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return departments;
                }
                // else if(location.location_profile_zip_code.includes(searchTerm))
                // {
                //     return departments
                // }
                
                else if (
                  location.location_profile_statedepartments
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return departments;
                }
              })
                  .map((location, index) => {
                    
                    return (
                      
                      //<div className="" key={location.id}>
                       <tr>
                                <td >{location.department_profile_label}</td>
                                <td  >{location.department_profile_name}</td>
                                <td >{location.location_profile_state}</td>
                                <td >{location.location_profile_city}</td>
                                <td >{location.location_profile_zip_code}</td>
                                <td >{location.location_profile_state}</td>
                                <td><Link
                          class="btn btn-primary px-4 py-1 "
                          to={`/departmentprofileupdate/${location.department_profile_id}`}
                        >
                          View
                        </Link></td>
                                <td><Link
                          class="btn btn-warning px-4 py-1 "
                          to={`/departmentprofileupdate/${location.department_profile_id}`}
                        >
                          Edit
                        </Link></td>
                                </tr>
                                //</div>
                               
                                );
                                
                              })}  */}
                              
                                
              
              

            </tbody>
          </Table>
        </div>
      </div>
    </div >
  )
}

export default AllMedicalProcedure;
