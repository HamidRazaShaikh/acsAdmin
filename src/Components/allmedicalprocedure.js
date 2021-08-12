import React, {useState, useEffect} from 'react'
import {  Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios'
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import ReactPaginate from "react-paginate";

import { useHistory} from "react-router-dom";


function AllMedicalProcedure() {
    
  const [searchTerm, setsearchTerm] = useState("");
  const [medicals, setmedicals] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const history = useHistory();

    const loadLocations = async () => {
        const response = await axios.get(
          `/v1/fe/root/org/medical/all`
        );
        setmedicals(response.data.payload.procedures);
      };
    
      useEffect(() => {
        loadLocations();
      }, []);

      const UpdateMedicalProcedure = (id) => {
        console.log(id)
        history.push(`/updatemedicalprocedure/${id}`)
      }

      const usersPerPage = 10;
      const pagesVisited = pageNumber * usersPerPage;
    
      const displayUsers = medicals
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .filter((location) => {
          if (searchTerm === "") {
            return medicals;
          } else if (
            location.medical_procedure_label.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return medicals;
          } else if (
            location.medical_procedure_name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return medicals;
          } else if (
            location.medical_procedure_types.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return medicals;
          }
          // else if (
          //   location.medical_procedure_cost.toLowerCase().includes(searchTerm.toLowerCase())
          // ) {
          //   return medicals;
          // }
          
          else if (
            location.department_profile_name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return medicals;
          }
          else if (
            location.medical_procedure_description.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return medicals;
          }
          
        })
        .map((location, index) => {
                        
          return (
            
            //<div className="" key={location.id}>
            <tr>
                                <td >{location.medical_procedure_label}</td>
                                <td  >{location.medical_procedure_name}</td>
                                <td >{location.medical_procedure_types}</td>
                                <td >{location.medical_procedure_cost}</td>
                                <td >{location.department_profile_name}</td>
                                <td >{location.medical_procedure_description}</td>
                                <td><Link
                          class="btn btn-primary px-4 py-1 "
                          // to={`/updatemedicalprocedure/${location.medical_procedure_id}`}
                          onClick={( )=> UpdateMedicalProcedure (location.medical_procedure_id)}
                        >
                          View
                        </Link></td>
                                <td><Link
                          class="btn btn-warning px-4 py-1 "
                          onClick={( )=> UpdateMedicalProcedure (location.medical_procedure_id)}
                        >
                          Edit
                        </Link></td>
                                </tr>
                      //</div>
                     
                      );
                      
                    });
      const pageCount = Math.ceil(medicals.length / usersPerPage);
    
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };
    

    return (
      <div className="mainbody bg-light">
      <Sidebar />
      <div className="container contact py-5 d-flex justify-content-between">
                    <div className="font-weight-bold h5">All Medical Procedures</div>
                    <div className="">
                        
                        <Button className="btn btn-primary px-3 py-1" href="/medicalprocedure">+New</Button>
                    </div>
                    
                </div>
      <div className="UserID bg-white mt-3 pt-4">
        <div className="container bg-white">
          <Table responsive="sm">
            <tr>
              <th>Label</th>
              <th>Name</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Department</th>
              <th>Description</th>
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
                                <td> <input type="Search" className="SearchBox " name="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)} /></td>
                    <td> <input type="Search" className="SearchBox " name="address"  placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)} /></td>
                            </tr>

                           
                           
                                 {displayUsers}

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
                              
                                
              
              

            </tbody>
          </Table>
        </div>
      </div>
      
    </div >
  )
}

export default AllMedicalProcedure;
