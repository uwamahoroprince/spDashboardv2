import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { url } from "../constants/constants";
import ReactDOM from "react-dom";
import "./styles.css";

import MapChart from "./MapChart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Sector,
} from "recharts";
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
export function Card() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [totalStation, setTotalStation] = useState();
  const [totalusers, setTotalUsers] = useState();
  const [totalRequest, setTotalRequest] = useState();
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const findTotalStation = async () => {
    try {
      const response = await axios.get(`${url.station}`);
      const stationNumber = response.data.data.length;
      setTotalStation(stationNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const findTotalUsers = async () => {
    try {
      const response = await axios.get(`${url.register}`);
      const userNumber = response.data.data.length;
      setTotalUsers(userNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const findTotalRequest = async () => {
    try {
      const response = await axios.get(`${url.serviceRequest}`);
      const response1 = await axios.get(`${url.fuelServiceRequest}`);
      const serviceNumber = response.data.data.length;
      const fuelNumber = response1.data.data.length;
      const totalRequest = serviceNumber + fuelNumber;
      //calc
      const otherServiceData = [];
      const formattedData = [];
      for (const key in response1.data.data) {
        otherServiceData.push({
          month: new Date(response1.data.data[key].createdAt).getMonth() + 1,
          amount: response1.data.data[key].price,
        });
      }
      for (const key in otherServiceData) {
        let month = otherServiceData[key].month;
        console.log(month);
        let index = formattedData.findIndex((el) => el.month === month);
        if (index != -1) {
          formattedData[index] = {
            month: month,
            amount:
              parseInt(formattedData[index].amount) +
              parseInt(otherServiceData[key].amount),
          };
        } else {
          formattedData.push({
            month: month,
            amount: parseInt(otherServiceData[key].amount),
          });
        }
      }
      for (const key in formattedData) {
        for (let i = 0; i < 12; i++) {
          if (i === formattedData[key].month) {
            formattedData[key] = {
              month: allMonths[i - 1],
              amount: formattedData[key].amount,
            };
          }
        }
      }
      const newpiewData = [];
      for (const key in formattedData) {
        newpiewData.push({
          name: formattedData[key].month,
          value: formattedData[key].amount,
        });
      }

      setData(formattedData);
      setTotalRequest(totalRequest);
      setPieData(newpiewData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    findTotalStation();
    findTotalUsers();
    findTotalRequest();
    console.log("running");
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Stations
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {totalStation}
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fas fa-gas-pump  fa-2x"
                    style={{ color: "#1c9a37" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {totalusers}
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fas fa-users fa-2x"
                    style={{ color: "#1c9a37" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Service Requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {totalRequest}
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fas fa-taxi fa-2x"
                    style={{ color: "#1c9a37" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Total Payments
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {totalRequest}
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fas fa-wallet fa-2x"
                    style={{ color: "#1c9a37" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col-sm-7 md-7 lg-7 card bg-light">
            <AreaChart
              width={640}
              height={350}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#1c9a37"
                fill="#1c9a37"
              />
            </AreaChart>
          </div>
          <div className="col-sm-5 md-5 lg-5 card bg-light">
            <PieChart width={500} height={400}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={pieData}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#1c9a37"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </div>
        </div>
        <div className="row flex-lg-nowrap">
          <div className="col">
            <MapChart />
          </div>
        </div>
      </div>
    </>
  );
}
