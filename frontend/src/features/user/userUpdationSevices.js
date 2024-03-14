import axios from 'axios'


// Register user
const uploadProfile = async (formData,token) =>{
    // const response = await axios.post(API_URL,userData)
    const config  = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const uploadProfile = await  axios.post('/uploadProfile',formData,config)
    if(uploadProfile.data) {
        console.log("Updated profile return data :",uploadProfile.data)
        // localStorage.removeItem('user');
        // localStorage.setItem('user',JSON.stringify(uploadProfile.data))
	// const {user,isError,isSucces,isLoading ,message} = useSelector((state) => state.updation) 
         
    }

    return uploadProfile.data
}

const editProfile = async (formData,token) => {
    const config  = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const updateProfile = await  axios.post('/updateProfile',formData,config)
    if(updateProfile.data){
        localStorage.removeItem('user');
        localStorage.setItem('user',JSON.stringify(updateProfile.data))
    }
    return updateProfile.data
}

const userService = {
   uploadProfile,
   editProfile
}

export default userService