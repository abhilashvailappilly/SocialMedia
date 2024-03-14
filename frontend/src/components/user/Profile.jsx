import React,{useState,useEffect} from 'react';
import {FaCheck, FaFileUpload,FaEdit,FaUserEdit} from 'react-icons/fa'
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
        phone:user.phone,
		image:user.image
    })
    let {name,email,phone,image} = formData
    
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
        const formData1 = new FormData()
        formData1.append('image',file)

		dispatch(uploadProfile(formData1))
		.then((da)=>{
			
			setFormData((prevState)=>({
				...prevState,
				['image']:da.payload.image
			}))
		})
		
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
		if(!name.trim() || !email.trim()) {
			toast.error("Please fill all the fileds")
 		} else {
			const userData = {
				name,
				email,
				phone
			}

			dispatch(editProfile(userData))
			setEditDiv(false)
		}
	}

	if(isLoading){
		return <Spinner/> 
	}
  return (
    <section className="vh-80 d-flex justify-content-between" style={{ backgroundColor: 'rgb(204 219 247)',borderRadius:'10px' }}>
        <div className='d-flex flex-column  '  style={{width:'30%'}} width='50%'>
            <div className="">
            <div>
            {/* <img  style={{ borderRadius: '50%', width: '200px', height: '200px' }} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Mo_o7hVWXYlm2SqJbcGHXgHaEo%26pid%3DApi&f=1&ipt=91c3ab07f428636e799aa20c6efd424f666004aa2a0f27c8994a3f475e0b48f6&ipo=images" alt="" /> */}
            <img  style={{ borderRadius: '50%', width: '200px', height: '200px' }} src={image ? '../../user/'+image :"https://tse3.mm.bing.net/th?id=OIP.K8yunvrQA8a0MY5khxh_iQHaFR&pid=Api&P=0&h=180"} alt="" />
			
 
            </div>
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
                <div >
                     <FaFileUpload/> <input type="file" hidden className="" id='image' name='image'  accept="image/*" onChange={handleFileChange}  /> 
                    <label htmlFor="image" style={{height:'50px'}} className='fileUploadLabel'>upload</label>
                </div>
             }
           </div>
			</div>
           
        </div>
	<div className=' d-flex flex-column justify-content-center' style={{width:'70%'}}>
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
		{/* <button >Edit Profile</button> */}
		<FaUserEdit onClick={handleEditPreviewClick} className="w-2" style={{ width: '2rem', height: '2rem', cursor: 'pointer' }}/>Edit proile
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
					<input type="tel" pattern="[0-9]{10}"  className="form-control" id='phone ' name ='phone' value={phone} placeholder='Enter your phone number ' onChange={onChange}  />
				</div>
				
				<div className="form-group">
					<button type='submit' className='btn btn-block'>Submit</button>
				</div>
			</form>
		</div>
	  }
	  </div>
    </section>
  );
}