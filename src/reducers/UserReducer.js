import {
    USER_DATA_FETCHING,
    USER_DATA_FAIL,
    USER_DATA_SUCCESS,
    USER_POST_FAIL,
    USER_DATA_POSTING
} from '../Utils/ActionTypes';
const initialState = {
    isFetching : null,
    data: [],
    hasError: false,
    errorMessage: null,
    isPosting:null
};
export default (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null,
                isPosting:null
            });
        case USER_DATA_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: true,
                errorMessage: action.err,
                isPosting:null
            });
        case USER_DATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null,
                isPosting:null
            });
        case USER_DATA_POSTING:
            return Object.assign({},state,{
                isFetching:false,
                data:null,
                hasError:false,
                errorMessage:null,
                isPosting:true
            })
        case USER_POST_FAIL:
            return Object.assign({},state,{
                isFetching:null,
                data:null,
                hasError:true,
                errorMessage:action.err,
                isPosting:false
            })
        default:
            return state
    }
}