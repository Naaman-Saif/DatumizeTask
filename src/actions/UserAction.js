import axios from 'axios';
import {apiBase} from '../Utils/Constants';
import {
    USER_DATA_FETCHING,
    USER_DATA_FAIL,
    USER_DATA_SUCCESS
} from '../Utils/ActionTypes';

export default function fetchUserData(){
    return dispatch =>{
        dispatch({type:USER_DATA_FETCHING});
        return axios.get(`${apiBase}/users`)
            .then(res =>{
                const users = res.data;
                axios.get(`${apiBase}/roles`)
                    .then(res =>{
                        const roles = res.data;
                        axios.get(`${apiBase}/projects`)
                            .then(res=>{
                                const projects = res.data;
                                dispatch({ type: USER_DATA_SUCCESS, payload: {users,roles,projects}})
                            })
                    })
            })
            .catch(err =>{
                dispatch({ type: USER_DATA_FAIL,payload:err.data });
            })
    }
}