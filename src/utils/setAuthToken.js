import axios from "axios";

const setAuthToken = token => {
    if(token) {
        axios.default.headers.common['Authorization'] = `Bear ${token}`;
    }else{
        delete axios.default.headers.common['Authorization']
    }
}

export default setAuthToken