import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import PopupDelete from "./popupdelete";
import DeletePolicyGroup from "./deletepolicygroup";
import { useHistory, useParams } from "react-router-dom";
import Notification from "./message";
import ConfirmDialog from "./confirmdialog";
import ReactLoading from "react-loading";

function AllMedicalProcedure() {
  const [searchTerm, setsearchTerm] = useState("");
  const [medicals, setmedicals] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [openPopupd, setOpenPopupd] = useState(false);
  const history = useHistory();
  const [done, setdone] = useState(undefined);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const loadLocations = async () => {
    const response = await axios.get(`/v1/fe/root/plsv/group/all`);
    setmedicals(response.data.payload.group);
    setdone(true);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleDelete = (id, uuid) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .put("/v1/fe/root/plsv/group/delete/", {
        id: id,
        uuid: uuid,
      })
      .then((response) => {
        //alert("Data Deleted Successfully");

        setNotify({
          isOpen: true,
          message: "Data Deleted Succcessfully",
          type: "success",
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);

        console.log(response.status);

        //setname(response.data);
        //if (!name) return "No post!";
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Failed To Delete Data",
          type: "error",
        });
      });
  };

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = medicals
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter((location) => {
      if (searchTerm === "") {
        return medicals;
      } else if (
        location.group_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      } else if (
        location.department.department_profile_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      } else if (
        location.group_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return medicals;
      }
    })
    .map((location, index) => {
      return (
        //<div className="" key={location.id}>
        <tr>
          <td>{location.group_name}</td>
          <td>{location.department.department_profile_name}</td>
          <td>{location.group_description}</td>
          <td className="d-none">{location.group_id}</td>
          <td className="d-none">{location.group_uuid}</td>

          <td>
            <Link
              class="btn btn-primary px-4 py-1 "
              to={`/updatepolicygroup/${location.group_uuid}`}
            >
              View
            </Link>
          </td>
          <td>
            <Link
              class="btn btn-warning px-4 py-1 "
              to={`/updatepolicygroup/${location.group_uuid}`}
              ///
            >
              Edit
            </Link>
          </td>
          <td>
            <Link
              class="btn btn-danger px-4 py-1 "
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete this record?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    handleDelete(location.group_id, location.group_uuid);
                  },
                });
                //handleDelete(location.group_id, location.group_uuid )
              }}
            >
              Delete
            </Link>
          </td>
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
        <div className="font-weight-bold h5">All Policy Group</div>
        <div className="">
          <Button className="btn btn-primary px-3 py-1" href="/policygroup">
            +New
          </Button>
        </div>
      </div>
      <div className="UserID bg-white mt-3 pt-4">
        <div className="container bg-white">
          <Table responsive="sm">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Description</th>

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
            </tbody>
          </Table>
        </div>
      </div>
      <PopupDelete
        title="DELETE POLICYGROUP"
        openPopupd={openPopupd}
        setOpenPopupd={setOpenPopupd}
      >
        <DeletePolicyGroup />
      </PopupDelete>

      <Notification notify={notify} setNotify={setNotify} />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default AllMedicalProcedure;
