import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import adminService from './adminService'

const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin :admin ? admin : null,
    isError :false,
    isSuccess : false,
    isLoading : false,
    message:'',
    users:[]
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

// Get users 
export const getUsers = createAsyncThunk('/getUsers',async(_,thunkAPI)=>{
    try{
        const token  = thunkAPI.getState().admin.admin.token
        return await adminService.getUsers(token)
    }catch(error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        // this will reject and send error message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

// Edit Profile
export const editUser = createAsyncThunk('/editUser',async(formData,thunkAPI)=>{
    try{
        const token  = thunkAPI.getState().admin.admin.token
        return await adminService.editUser(formData,token)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        // this will reject and send error message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

// Toggle user
export const toggleUser = createAsyncThunk('/toggleUser',async(userId,thunkAPI)=>{
    try{
        const token  = thunkAPI.getState().admin.admin.token
        console.log("tok-",token)
        return await adminService.toggleUser(userId,token)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        // this will reject and send error message as payload
        return thunkAPI.rejectWithValue(message)
    }
})


// Toggle user
export const deleteUser = createAsyncThunk('/deleteUser',async(userId,thunkAPI)=>{
    try{
        const token  = thunkAPI.getState().admin.admin.token
        return await adminService.deleteUser(userId,token)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        // this will reject and send error message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers:{
        resetAdmin:(state) =>{
            state.isLoading =false
            state.isSuccess = false
            state.isError  = false
            state.message = ''
            // state.users =[]
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
        .addCase(getUsers.pending,(state) => {
            state.isLoading = true 
        })
        .addCase(getUsers.fulfilled,(state,action) =>{
            state.isLoading = false
            // state.isSuccess = true
            state.users = action.payload
        })
        .addCase(getUsers.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true 
            state.message = action.payload
        })
        .addCase(editUser.pending,(state) => {
            state.isLoading = true 
        })
        .addCase(editUser.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message
            // state.admin.users = action.payload
        })
        .addCase(editUser.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true 
            state.message = action.payload
        })
        .addCase(toggleUser.pending,(state) => {
            state.isLoading = true 
        })
        .addCase(toggleUser.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message
            // state.admin.users = action.payload
        })
        .addCase(toggleUser.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true 
            state.message = action.payload
        })
        .addCase(deleteUser.pending,(state) => {
            state.isLoading = true 
        })
        .addCase(deleteUser.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message
            // state.admin.users = action.payload
        })
        .addCase(deleteUser.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true 
            state.message = action.payload
        })
       
        .addCase(adminLogout.fulfilled,(state)=>{
            state.admin =null
        })
    }
})

export const {resetAdmin} = adminSlice.actions
export default adminSlice.reducer 