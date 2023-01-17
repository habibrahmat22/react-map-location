import { GET_LIST_USER } from "../type/UserType";
const initialState = {
    getListUserResult : false,
    getListUserError : false,

}

const User = (state = initialState,action)=>{
    switch(action.type){
        case GET_LIST_USER:
            return {
                ...state,
                getListUserResult : action.payload.data,
                getListUserError : action.payload.errorMessage
            }
        default:
            return state;
    }
}

export default User