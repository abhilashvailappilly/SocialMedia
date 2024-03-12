import axios from 'axios'


// Admin Login
const adminLogin = async (adminData) =>{
    const response = await axios.post('/adminLogin',adminData)
console.log(response.data)
    if(response.data) {
        localStorage.setItem('admin',JSON.stringify(response.data))
    }

    return response.data
}

const adminLogout =  () =>{
    localStorage.removeItem('admin')
}

const adminService = {

    adminLogin,
    adminLogout
}

export default adminService