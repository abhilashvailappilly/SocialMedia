import axios from 'axios'

const API_URL = '/register'

// Register user
const register = async (userData) =>{
    const response = await axios.post(API_URL,userData)
    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) =>{
    const response = await axios.post('/login',userData)
    console.log(response.data)

    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const logout =  () =>{
    localStorage.removeItem('user')
}

// Admin Login
const adminLogin = async (userData) =>{
    const response = await axios.post('/login',userData)

    if(response.data) {
        localStorage.setItem('admin',JSON.stringify(response.data))
    }

    return response.data
}

const adminLogout =  () =>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    adminLogin,
    adminLogout
}

export default authService