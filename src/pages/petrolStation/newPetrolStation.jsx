import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from "axios";
import Select from "react-select";
import {url} from "../../constants/constants"
const containerStyle = {
  width: "1100px",
  height: "500px",
  marginLeft: "10px",
};
const center = {
  lat: -1.9437057,
  lng: 29.8805778,
};
export function PetrolStation(props) {
  const [allServices, setAllServices] = useState([]);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [name, setName] = useState("");
  const [services, setServices] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responce = await axios.post(url.station, {
        locationName: name,
        latitude: lat,
        longitude: long,
        services: services,
      });
      console.log(responce);
    } catch (error) {
      console.error(error);
    }
  };
  const option = [];
  const getAllService = async () => {
    try {
      const response = await axios.get(url.service);
      const results = response.data.data;
      for (const key in results) {
        option.push({
          value: results[key]._id,
          label: results[key].locationName,
        });
      }
      setAllServices(option);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (data) => {
    setServices(data);
  };
  useState(() => {
    getAllService();
  }, []);
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyAnXCkY0WSqQZ1KtEItNeMhCcUVhBcaoQI">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={(e) => {
            setLat(e.latLng.lat());
            setLong(e.latLng.lng());
          }}
        >
          <></>
        </GoogleMap>
      </LoadScript>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-7">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Create new station</h1>
            </div>
            <form class="user" onSubmit={handleSubmit}>
              <div class="form-group row">
                <div class="col-sm-6">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    class="form-control "
                    id="exampleFirstName"
                    placeholder="petrol station name"
                  />
                </div>

                <br />

                <div class="col-sm-6">
                  <input
                    type="text"
                    value={lat}
                    class="form-control "
                    readOnly
                    id="exampleLastName"
                    placeholder="latitude"
                  />
                </div>
              </div>
              <div class="form-group row ">
                <div class="col-sm-6">
                  <input
                    type="text"
                    value={long}
                    class="form-control"
                    readOnly
                    id="exampleLastName"
                    placeholder="longitude"
                  />
                </div>

                <div class="col-sm-6">
                  {/* <select
                    class="form-control"
                    onChange={(services) => setServices(services.target.value)}
                  >
                    <option value="" selected disabled>
                      Select Service
                    </option>
                    {allServices.map((data) => (
                      <option value={data._id}>{data.name}</option>
                    ))}
                  </select> */}
                  <Select
                    placeholder="Search and Select Service"
                    closeMenuOnSelect={false}
                    options={allServices}
                    isMulti
                    isSearchable
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row d-flex justify-content-center align-items-center">
                <input
                  className="btn btn-success center"
                  type="submit"
                  value="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
