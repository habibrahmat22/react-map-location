import axios from "axios";
import { GET_LIST_USER } from "../type/UserType";

export const getListUser = ()=>{
    return (dispatch)=>{
        // get API
        axios.get("/api/v1/users")
        .then((response)=>{
            const newData = response.data?.data.map((data,index) =>({...data,key:index+1}))
            dispatch({
                type: GET_LIST_USER,
                payload : {
                    data : newData, 
                    errorMessage : false
                }
            })
        })
        .catch((error)=>{
            dispatch({
                type: GET_LIST_USER,
                payload : {
                    data : false, 
                    errorMessage : error.response.data.message
                }
            })
        })
    }
}