import { createSlice } from "@reduxjs/toolkit"
// import {user} from "../../assets/Data.jsx"

const initialState = {
    user: sessionStorage.getItem("userInfo") 
    ? sessionStorage.getItem("userInfo")
    : null,

    isSidebarOpen:false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
            setCredentials : (state, action)=>{
                state.user = action.payload
                sessionStorage.setItem("userInfo", JSON.stringify(action.payload))
            },
            logout: (state, action)=>{
                state.user = null
                sessionStorage.removeItem("userInfo")
            }
    }
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer