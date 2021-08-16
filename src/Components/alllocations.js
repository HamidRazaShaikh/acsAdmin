import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
//import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";

function AllLocations() {
  //const [page, setpage] = useState(1);
  const [searchTerm, setsearchTerm] = useState("");
  const [locations, setlocations] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [done, setdone] = useState(undefined);


  const loadLocations = async () => {
    const response = await axios.get(`/v1/fe/root/org/location/all`);
    setlocations(response.data.payload.locations);
    setdone(true);

  };

  useEffect(() => {
    loadLocations();
  }, []);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  
    
    const displayUsers = locations
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter((location) => {
      if (searchTerm === "") {
        return locations;
      } else if (
        location.email.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return locations;
      } else if (
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return locations;
      } else if (
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return locations;
      }
      // else if (
      //   location.zip_code.toLowerCase().includes(searchTerm.toLowerCase())
      // ) {
      //   return locations;
      // }
      
      else if (
        location.state.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return locations;
      }
      
    })
    .map((location, index) => {
                    
      return (
        
        //<div className="" key={location.id}>
         <tr>
                  <td >{location.email}</td>
                  <td className="w-50" >{location.address}</td>
                  <td className="w-25" >{location.city}</td>
                  <td className="w-25">{location.zip_code}</td>
                  <td >{location.state}</td>
                 
                  <td><Link
            class="btn btn-primary px-4 py-1 "
            to={`/locationprofileupdate/${location.id}`}
          >
            View
          </Link></td>
                  <td><Link
            class="btn btn-warning px-4 py-1 "
            to={`/locationprofileupdate/${location.id}`}
          >
            Edit
          </Link></td>
                  </tr>
                  //</div>
                 
                  );
                  
                });
    
  const pageCount = Math.ceil(locations.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
              <th className="d-flex justify-content-center">Action</th>
            </tr>

            <tbody>
              <tr>
                <td>
                  {" "}
                  <input
                    type="Search"
                    className="SearchBox "
                    name="address"
                    placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="Search"
                    className="SearchBox "
                    name="address"
                    placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="Search"
                    className="SearchBox "
                    name="address"
                    placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="Search"
                    className="SearchBox "
                    name="address"
                    placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="Search"
                    className="SearchBox "
                    name="address"
                    placeholder=""
                    onChange={(e) => setsearchTerm(e.target.value)}
                  />
                </td>
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
              </div>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AllLocations;
