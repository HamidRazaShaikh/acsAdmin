import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useHistory} from "react-router-dom";

function AllUsers() {
  const [searchTerm, setsearchTerm] = useState("");
  const [medicals, setmedicals] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const history = useHistory();

  const loadLocations = async () => {
    const response = await axios.get(`/v1/fe/root/usr/users/offset/0`);
    setmedicals(response.data.payload.users);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const UserDetailProfile = (id) => {
    console.log(id)
    history.push(`/userdetailprofile/${id}`)
  }

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = medicals
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter((location) => {
      if (searchTerm === "") {
        return medicals;
      } else if (
        location.u_first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      } else if (
        location.u_middle_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      } else if (
        location.u_last_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      }
     
      else if (
        location.ua_email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      } else if (
        location.ua_access
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      }
    //   else if (
    //     location.department.department_profile_name
    //       .toLowerCase()
    //       .includes(searchTerm.toLowerCase())
    //   ) {
    //     return medicals;
    //   }
    })
    .map((location, index) => {
      return (
        //<div className="" key={location.id}>
        <tr>
          <td>{location.u_first_name}</td>
          <td>{location.u_middle_name}</td>
          <td>{location.u_last_name}</td>
          <td>{location.ua_email}</td>
          <td>{location.ua_access}</td>
          <td>{location.department.department_profile_name}</td>
          <td>
            <Link
              class="btn btn-primary px-4 py-1 "
              onClick={( )=> UserDetailProfile(location.ua_user_id)}
            >
              View
            </Link>
          </td>
          {/* <td>
            <Link
              class="btn btn-warning px-4 py-1 "
              to={`/updatemedicalprocedure/${location.medical_procedure_id}`}
            >
              Edit
            </Link>
          </td> */}
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
        <div className="font-weight-bold h5">All Users</div>
        
      </div>
      <div className="UserID bg-white mt-3 pt-4">
        <div className="container bg-white">
          <Table responsive="sm">
            <tr>
              <th>First&nbsp;Name</th>
              <th>Middle&nbsp;Name</th>
              <th>Last&nbsp;Name</th>
              <th>Email</th>
              <th>Access</th>
              <th>Department</th>
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
                    ame="address"
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
    </div>
  );
}
export default AllUsers;
