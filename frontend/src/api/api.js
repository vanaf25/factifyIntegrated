import axios from "axios";
const BASE_URL=`http://localhost:5000/`;
const REMOTE_URL=`https://fast-check-psi.vercel.app/`
const instance = axios.create({
    baseURL: REMOTE_URL,
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
    }
});
export default instance