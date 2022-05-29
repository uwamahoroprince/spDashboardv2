import axios from "axios";
export default axios.create({
    baseUrl:"https://gps-sp-station-detector-default-rtdb.firebaseio.com/"
})