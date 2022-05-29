import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../constants/constants";
import ReactToExcel from "react-html-table-to-excel";
const FuelPayment = () => {
  const [allFuelRequests, setAllFuelRequests] = useState([]);
  const getAllFuelPayments = async () => {
    try {
      const response = await axios.get(url.fuelServiceRequest);
      setAllFuelRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllFuelPayments();
  }, []);
  return (
    <>
      <div className="col mb-3">
        <div className="e-panel card">
          <div className="card-body">
            <div className="card-title">
              <h6 className="mr-2">
                <span>All</span>
                <small className="px-1">Services</small>
              </h6>
            </div>
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-11">
                <div className="card card-table">
                  <div className="card-body">
                    <div className="table-responsive">
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
                            <th className="sortable">plate number</th>
                            <th className="sortable">phone</th>
                            <th className="sortable">email</th>
                            <th className="sortable">transaction Number</th>
                            <th className="sortable">price</th>
                            {/* <th className="sortable">station</th> */}
                            <th className="sortable">fuel type</th>
                            <th className="sortable">liters</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allFuelRequests !== 0 ? (
                            allFuelRequests.map((data, index) => (
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
                                    {data.plateNumber}
                                  </div>
                                </td>
                                <td className="text-nowrap align-middle">
                                  {data.phone}
                                </td>
                                <td className="text-nowrap align-middle">
                                  {data.email}
                                </td>
                                <td className="text-nowrap align-middle">
                                  {data.transactionNumber}
                                </td>
                                {/* <td className="text-nowrap align-middle">
                            {data.service.name}
                          </td> */}

                                <td className="text-nowrap align-middle">
                                  {data.price}
                                </td>
                                <td className="text-nowrap align-middle">
                                  {data.fuelType}
                                </td>
                                <td className="text-nowrap align-middle">
                                  {data.liters}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <span>no data found</span>
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
    </>
  );
};
export default FuelPayment;
