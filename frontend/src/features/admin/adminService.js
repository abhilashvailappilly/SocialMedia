import axios from 'axios'


// Admin Login
const adminLogin = async (adminData) =>{
    const response = await axios.post('/adminLogin',adminData)
    if(response.data) {
        localStorage.setItem('admin',JSON.stringify(response.data))
    }

    return response.data
}

const adminLogout =  () =>{
    localStorage.removeItem('admin')
}


// Get all users
const getUsers = async (token) =>{
    console.log("token :",token)
    const config  = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get('/admin/getUsers',config)
    if(response.data) {
        // localStorage.setItem('admin',JSON.stringify(response.data))
        console.log("get users response")
    }

    return response.data
}

//Edit user details by admin
const editUser = async (formData,token) => {
    const config  = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const updateProfile = await  axios.post('/admin/editUser',formData,config)
    if(updateProfile.data){
        // localStorage.removeItem('admin');
        // localStorage.setItem('admin',JSON.stringify(updateProfile.data))
    }
    return updateProfile.data
}

// Toggle user status by admin
const toggleUser = async (userId,token) => {
    console.log('toke n - :',token )
    const config  = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const updateProfile = await  axios.patch(`/admin/toggleUser/${userId}`,userId,config)
    if(updateProfile.data){
        // localStorage.removeItem('admin');
        // localStorage.setItem('admin',JSON.stringify(updateProfile.data))
    }
    return updateProfile.data
}

// Toggle user status by admin
const deleteUser = async (userId,token) => {
    const config  = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const deleteUser = await  axios.delete(`/admin/deleteUser/${userId}`,config)
    if(deleteUser.data){
        // localStorage.removeItem('admin');
        // localStorage.setItem('admin',JSON.stringify(updateProfile.data))
    }
    return deleteUser.data
}


const adminService = {

    adminLogin,
    adminLogout,
    getUsers,
    editUser,
    toggleUser,
    deleteUser
}

export default adminService