import React, { useState, useEffect } from "react";
import { url } from "../../constants/constants";
import axios from "axios";
import ReactToExcel from "react-html-table-to-excel";
const AllStations = () => {
  const [allStation, setAllStation] = useState([]);
  const [is, setIs] = useState("");
  const getAllService = async () => {
    try {
      const response = await axios.get(url.station);
      setAllStation(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(url.station + "/" + id);
      setIs(id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllService();
  }, [is]);
  return (
    <>
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="e-tabs mb-3 px-3">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Station
                  </a>
                </li>
              </ul>
            </div>
            <div className="row flex-lg-nowrap">
              <div className="col mb-3">
                <div className="e-panel card">
                  <div className="card-body">
                    <div className="card-title">
                      <h6 className="mr-2">
                        <span>All</span>
                        <small className="px-1">Stations</small>
                      </h6>
                    </div>
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
                                <th className="max-width">latitude</th>
                                <th className="sortable">lengitude</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allStation !== 0 ? (
                                allStation.map((data, index) => (
                                  <tr>
                                    <td className="align-middle text-center">
                                      <div
                                        className="bg-light d-inline-flex justify-content-center align-items-center align-top"
                                        style={{
                                          width: "35px",
                                          height: "35px",
                                          borderRadius: "3px",
                                        }}
                                      >
                                        {data.locationName}
                                      </div>
                                    </td>
                                    <td className="text-nowrap align-middle">
                                      {data.latitude}
                                    </td>
                                    {data.longitude}
                                    <td className="text-center align-middle">
                                      <div className="btn-group align-top">
                                        <button
                                          className="btn btn-sm btn-outline-secondary badge"
                                          type="button"
                                          data-toggle="modal"
                                          data-target="#user-form-modal"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          className="btn btn-sm btn-outline-secondary badge"
                                          type="button"
                                        >
                                          <i
                                            onClick={() =>
                                              handleDelete(data._id)
                                            }
                                            className="fa fa-trash"
                                          ></i>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <span>no service found</span>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllStations;
