import { AsyncStorage } from 'react-native';
const axios = require('axios');


export const Andar = (GetNumber) => {
    return async (dispatch) => {

        const url = `http://192.168.43.75:4000/auth/login`
        await axios.post(url, {Mobile: GetNumber})
        .then(async(response) => await AsyncStorage.setItem('USER', JSON.stringify(response.data)), dispatch({type:'CHANGE_NAME', payload:response.data}))
        .catch((error) => console.log(error));
        
    }
}