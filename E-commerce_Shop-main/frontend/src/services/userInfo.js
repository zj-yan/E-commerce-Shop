import axios from 'axios';

class UserInfoDataService {

    loginCheck(userName, password) {
        //console.log('come to loginCheck'); 
        //console.log(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/check/${userName}/${password}`);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/check/${userName}/${password}`);
    }

    getUserInfo(userName) {
        //console.log('come to getUserInfo'); 
        //console.log(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/userInfo/${userName}`);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/userInfo/${userName}`);
    }

    signUpUser(input) {
        //console.log(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/signup`);
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/signup`, input);
    }


}

export default new UserInfoDataService;