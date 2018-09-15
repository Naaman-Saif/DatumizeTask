import axios from 'axios';
import { apiBase } from '../Utils/Constants';
import {
    USER_DATA_POSTING,
    ROLES_DATA_POSTING,
    PROJECTS_DATA_POSTING,
    USER_POST_FAIL,
    USER_POST_SUCCESS
} from '../Utils/ActionTypes';

export default function postUserData(data) {
    return dispatch => {
        dispatch({ type: USER_DATA_POSTING });
        axios.post(`${apiBase}/users`,data.users)
            .then(res => {
                dispatch({type:ROLES_DATA_POSTING,payload:res.data})
                axios.post(`${apiBase}/roles`,data.roles)
                    .then(res => {
                        dispatch({type:PROJECTS_DATA_POSTING,payload:res.data})
                        axios.post(`${apiBase}/projects`,data.projects)
                            .then(res=>{
                                dispatch({type:USER_POST_SUCCESS,payload:res.data})
                            })
                    })
            })
            .catch(err => {
                dispatch({ type: USER_POST_FAIL, payload: err.data });
            })
    }
}