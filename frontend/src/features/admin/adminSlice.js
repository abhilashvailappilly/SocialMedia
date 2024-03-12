import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import adminService from './adminService'

const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin :admin ? admin : null,
    isError :false,
    isSuccess : false,
    isLoading : false,
    message:''
}
 


// Login User
export const adminLogin = createAsyncThunk('/adminLogin',async(admin,thunkAPI) => {

    try{
        return await adminService.adminLogin(admin)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        // this will reject and send error message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

export  const adminLogout = createAsyncThunk('/adminLogout', async ()=>{
    adminService.adminLogout()
})

export const authSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers:{
        resetAdmin:(state) =>{
            state.isLoading =false
            state.isSuccess = false
            state.isError  = false
            state.message = ''
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(adminLogin.pending,(state) => {
            state.isLoading = true 
        })
        .addCase(adminLogin.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
        })
        .addCase(adminLogin.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true 
            state.message = action.payload
            state.admin = null
        })
       
        .addCase(adminLogout.fulfilled,(state)=>{
            state.admin =null
        })
    }
})

export const {resetAdmin} = authSlice.actions
export default authSlice.reducer 