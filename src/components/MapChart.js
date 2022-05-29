import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../constants/constants";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
  const [location, setLocation] = useState([]);
  const getAllStations = async () => {
    try {
      const response = await axios.get(`${url.station}`);
      const data = response.data.data;
      setLocation(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStations();
  }, []);
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-30.4, 2.8, -20],
        scale: 10000,
      }}
    >
      <Geographies
        geography={geoUrl}
        fill="#D6D6DA"
        stroke="#FFFFFF"
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {location.length != 0 ? (
        location.map((loc, index) => (
          <Annotation
            subject={[loc.longitude, loc.latitude]}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: "#1c9a37",
              strokeWidth: 3,
              strokeLinecap: "round",
            }}
          >
            <text
              x="-8"
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#FFF"
            >
              {loc.locationName}
            </text>
          </Annotation>
        ))
      ) : (
        <></>
      )}
    </ComposableMap>
  );
};

export default MapChart;
