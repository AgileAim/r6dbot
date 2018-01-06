import axios from "axios";

const r6dbInstance = axios.create({
    baseURL: "https://r6db.com/api/v2"
});

r6dbInstance.defaults.headers.common["x-app-id"] = process.env.R6DB_APPID;
r6dbInstance.defaults.timeout = 2000;

export default r6dbInstance;