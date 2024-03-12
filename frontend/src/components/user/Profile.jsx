import React,{useState,useEffect} from 'react';
import {FaCheck, FaFileUpload} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

import './profile.css'
import { uploadProfile,editProfile,reset } from '../../features/user/userUpdationSlice';
import Spinner from '../Spinner';

export default function Profile() {
    const [previewImage, setPreviewImage] = useState(null);
	const [editDiv,setEditDiv] = useState(false)
    const [file,setFile] = useState()
	const dispatch = useDispatch()

	const {user} = useSelector((state)=> state.auth)
	const [formData,setFormData] = useState({
        name:user.name,
        email:user.email,
        phone:user.phone
    })
    const {name,email,phone} = formData
    
	const {isError,isSuccess,isLoading,message} = useSelector((state) => state.updation) 

	useEffect (()=>{

		if(isError){
			toast.error(message)
		}
		if(isSuccess ){
			toast.success(message)

		}
		dispatch(reset())
	},[user,isError,isSuccess,message,dispatch])

    const handleProfileUpload =() =>{
        const formData = new FormData()
        formData.append('image',file)
		dispatch(uploadProfile(formData))
		setPreviewImage(null)
  
    } 

	const onChange =(e)=>{
		setFormData((prevState)=>({
			...prevState,
			[e.target.name]:e.target.value
		}))
	}
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if(file){
        setFile(e.target.files[0])
      }
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

	const handleEditPreviewClick = () =>{
		setEditDiv(prev=>!prev)

	}

	
	const submitEditProfile =(e)=>{
		e.preventDefault()
		if(!name.trim() || !email.trim() || !phone.trim()) {
			const userData = {
				name,
				email,
				phone
			}

			dispatch(editProfile(userData))
		} else {
			toast.error("Please fill all the fileds")
		}
			
		
	}

	if(isLoading){
		return <Spinner/>
	}
  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <div className='d-flex'>
            <div>
            <img  style={{ borderRadius: '50%', width: '200px', height: '200px' }} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Mo_o7hVWXYlm2SqJbcGHXgHaEo%26pid%3DApi&f=1&ipt=91c3ab07f428636e799aa20c6efd424f666004aa2a0f27c8994a3f475e0b48f6&ipo=images" alt="" />
            {/* <img  style={{ borderRadius: '50%', width: '200px', height: '200px' }} src={user.image ? `../../../` :"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Mo_o7hVWXYlm2SqJbcGHXgHaEo%26pid%3DApi&f=1&ipt=91c3ab07f428636e799aa20c6efd424f666004aa2a0f27c8994a3f475e0b48f6&ipo=images"} alt="" /> */}
			{/* <img src='1710165240080-burgerhub.png' alt="" /> */}
			{/* <img src="./1710165240080-burgerhub.png" alt="" /> */}
			{/* <img src="logo512.png" alt="" /> */}

            </div>
            <div className="">
            <div>
                 {previewImage && 
                    <>
                        <img src={previewImage} alt="Preview"  style={{  width: '200px', height: '100px' }} /> <br />
                        <FaCheck onClick={handleProfileUpload} style={{ color: 'green', fontSize: '2rem'  }}/>
                    </>
                 }
            </div>
           <div>
           {!previewImage &&
                <>
                     <FaFileUpload/> <input type="file" hidden className="" id='image' name='image'  onChange={handleFileChange}  /> 
                    <label htmlFor="image" className='fileUploadLabel'>upload</label>
                </>
             }
           </div>
		</div>
           
        </div>
      <div>
        {
			user.name && <h4>Name : {name} </h4>
		}
		{
			user.email && <h4>Email : {email} </h4>
		}
		{
			user.phone && <h4>Mobile : {phone} </h4>
		}
       

      </div>
	  <div>
		<button onClick={handleEditPreviewClick}>Edit Profile</button>
	  </div>
      {
		editDiv && <div>
			<form action="" onSubmit={submitEditProfile} >
				<div className="form-group">
					<input type="text" className="form-control" id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="mobile" className="form-control" id='phone ' name ='phone' value={phone} placeholder='Enter your phone number ' onChange={onChange}  />
				</div>
				
				<div className="form-group">
					<button type='submit' className='btn btn-block'>Submit</button>
				</div>
			</form>
		</div>
	  }
    </section>
  );
}