import React, { useState, useEffect } from "react";
import { url } from "../../constants/constants";
import ReactToExcel from "react-html-table-to-excel";
import axios from "axios";
const Service = () => {
  const [allServices, setAllServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  let name = "";
  let price = "";
  let desc = "";
  const [is, setIs] = useState("");
  let status = false;
  const handleServicesPost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(url.service, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: serviceName,
          price: servicePrice,
          description: serviceDescription,
        }),
      });
      setIs(response.data.data_id);
    } catch (error) {
      console.log(error);
    }
  };
  const update = (data) => {
    status = true;
    name = data.name;
    price = data.price;
    desc = data.description;
  };
  const getAllService = async () => {
    try {
      const response = await axios.get(url.service);
      setAllServices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(url.service + "/" + id);
      setIs(id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllService();
  }, [is, status]);
  return (
    <>
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="e-tabs mb-3 px-3">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Services
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
                        <small className="px-1">Services</small>
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
                                <th className="max-width">Description</th>
                                <th className="sortable">Price</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allServices !== 0 ? (
                                allServices.map((data, index) => (
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
                                        {data.name}
                                      </div>
                                    </td>
                                    <td className="text-nowrap align-middle">
                                      {data.description}
                                    </td>
                                    {data.price}
                                    <td className="text-center align-middle">
                                      <div className="btn-group align-top">
                                        <button
                                          className="btn btn-sm btn-outline-secondary badge"
                                          type="button"
                                          data-toggle="modal"
                                          data-target="#user-form-modal"
                                          onClick={update(data)}
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
              <div className="col-12 col-lg-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center px-xl-3">
                      <button
                        className="btn btn-success btn-block"
                        type="button"
                        data-toggle="modal"
                        data-target="#user-form-modal"
                      >
                        New Service
                      </button>
                    </div>
                    <hr className="my-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* User Form Modal  */}
            <div
              className="modal fade"
              role="dialog"
              tabindex="-1"
              id="user-form-modal"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create Service</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      <span aria-hidden="false">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="py-1">
                      <form
                        className="form"
                        onSubmit={handleServicesPost}
                        novalidate=""
                      >
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Service Name</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="enter service name"
                                    onChange={(name) =>
                                      setServiceName(name.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>Service Price</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="price"
                                    placeholder="enter price in Frw"
                                    onChange={(price) =>
                                      setServicePrice(price.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col mb-3">
                                <div className="form-group">
                                  <label>Description</label>
                                  <textarea
                                    className="form-control"
                                    rows="5"
                                    placeholder="more about service"
                                    onChange={(descripiton) =>
                                      setServiceDescription(
                                        descripiton.target.value
                                      )
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col d-flex justify-content-center">
                            <button className="btn btn-success" type="submit">
                              Save Service
                            </button>
                          </div>
                        </div>
                      </form>
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
export default Service;
