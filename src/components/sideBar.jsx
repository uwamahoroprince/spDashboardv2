import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo2.png";

export function SideBar() {
  return (
    <>
      <ul
        className="navbar-nav sidebar sidebar-dark accordion"
        style={{ background: "#1c9a37" }}
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon ">
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "150px",
                height: "80px",
              }}
              className="mt-2 mb-2"
            />
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <Link to="/">
          <li className="nav-item active">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
        </Link>

        <hr className="sidebar-divider" />

        <li className="nav-item active">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i class="fas fa-gas-pump"></i>

            <span>Petrol Station</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">SP Petrol Station Info</h6>
              <Link to="/newPetrolStation">
                <a className="collapse-item">Add Petrol Station</a>
              </Link>
              <Link to="/allStation">
                <a className="collapse-item">All Petrol Stations</a>
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item active">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i class="fas fa-chart-pie"></i>
            <span>Transaction</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Transaction info</h6>
              <Link to="/servicePayment">
                <a className="collapse-item" href="utilities-color.html">
                  service
                </a>
              </Link>
              <Link to="/fuelPayment">
                <a className="collapse-item" href="utilities-border.html">
                  Fuel
                </a>
              </Link>
            </div>
          </div>
        </li>

        <Link to="/service">
          <li className="nav-item active">
            <a className="nav-link">
              <i class="fas fa-taxi"></i>
              <span>Services</span>
            </a>
          </li>
        </Link>
        <Link to="/users">
          <li className="nav-item active">
            <a className="nav-link">
              <i class="fas fa-users"></i>
              <span>Users</span>
            </a>
          </li>
        </Link>
      </ul>
    </>
  );
}
