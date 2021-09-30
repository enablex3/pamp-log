import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.1.239:8090/api",
    headers: {
        "Content-type": "application/json"
    }
});