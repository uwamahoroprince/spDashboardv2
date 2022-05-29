import axios from "axios";
import React, { useState, useEffect } from "react";
import { url } from "../../constants/constants";
import ReactToExcel from "react-html-table-to-excel";
const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const getAllUsers = async () => {
    const response = await axios.get(`${url.register}`);
    const data = response.data.data;
    setAllUsers(data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-sm-11">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {" "}
                <ReactToExcel
                  className="btn btn-success m-2"
                  table="dayly-report"
                  filename="Report"
                  buttonText="Report"
                />
                <table
                  className="table table-stripped bg-light table-hover datatable"
                  id="dayly-report"
                >
                  <thead className="thead bg-success text-light">
                    <tr>
                      <th>Name</th>
                      <th>user Name</th>
                      <th>Phone</th>
                      <th>Email At</th>
                      <th>Address</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.length != 0 ? (
                      allUsers.map((data, index) => (
                        <tr>
                          <td>{data.name}</td>
                          <td>{data.userName}</td>
                          <td>{data.phone}</td>
                          <td className="items-text">{data.email}</td>
                          <td>{data.address}</td>
                          <td>{data.role}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>no Data Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Users;
