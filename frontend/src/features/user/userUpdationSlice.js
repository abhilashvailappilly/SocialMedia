import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import userService from './userUpdationSevices'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user :user ? user : null,
    isError :false,
    isSuccess : false,
    toast:false,
    isLoading : false,
    message:''
}
 
// Upload profile picture
export const uploadProfile = createAsyncThunk('/uploadProfile',async(imageData,thunkAPI) => {

    try{
        const token  = thunkAPI.getState().auth.user.token
        return await userService.uploadProfile(imageData,token)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        // this will reject and send error message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

// Edit profile
export const editProfile = createAsyncThunk('/editProfile',async(formData,thunkAPI) => {

    try{
        const token  = thunkAPI.getState().auth.user.token
        return await userService.editProfile(formData,token)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        // this will reject and send error message as payload
        return thunkAPI.rejectWithValue(message)
    }
})




export const userSlice = createSlice({
    name: 'authUp',
    initialState,
    reducers:{
        reset:(state) =>{
            state.isLoading =false
            state.isSuccess = false
            state.isError  = false
            state.message = ''
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(uploadProfile.pending,(state) => {
            state.isLoading = true 
        })
        .addCase(uploadProfile.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.toast = true
            state.user = action.payload
            state.message = action.payload.message
        })
        .addCase(uploadProfile.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true 
            state.message = action.payload
            state.user = null // 
        })
        .addCase(editProfile.pending,(state) => {
            state.isLoading = true 
        }) 
        .addCase(editProfile.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.toast = true
            state.message = action.payload.message
            state.user = action.payload
        })
        .addCase(editProfile.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true 
            state.message = action.payload
            state.user = null
        })
       
    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer