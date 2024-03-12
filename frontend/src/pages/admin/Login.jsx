import {FaSignInAlt} from 'react-icons/fa'
import {useState,useEffect} from 'react' 
// import {FaUser} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'


import { adminLogin,resetAdmin } from '../../features/admin/adminSlice'
import Spinner from '../../components/Spinner'

function Login() {
    
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const {email,password} = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {admin,isError,isSucces,isLoading ,message} = useSelector((state) => state.admin) 
    console.log('admin',admin,isError,isSucces,isLoading ,message)
	useEffect (()=>{
		if(isError){   
			toast.error(message)
		}
		if(isSucces || admin){
			navigate('/admin/home') 
		}
		dispatch(resetAdmin())
	},[admin,isError,isSucces,message,navigate,dispatch])

 
	const onChange =(e)=>{
		setFormData((prevState)=>({
			...prevState,
			[e.target.name]:e.target.value
		}))
	}
	const onSubmit =(e)=>{
		e.preventDefault()  
        if(!email.trim() ||  !password.trim() ){
			toast.error('Please fill all the fields')
        } else{
            const adminData = {
                email,password 
            }
            dispatch(adminLogin(adminData))
        }
	
}
	if(isLoading) {
		return <Spinner/>
	}
  return (
   <>
        <section className='heading'>
			<h1> <FaSignInAlt/> Admin Login</h1>
			<p>Login to your account</p>
        </section>
        <section className="form">
			<form action="" onSubmit={onSubmit}>
				
				<div className="form-group">
					<input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}  />
				</div>
				
				<div className="form-group">
					<input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}  />
				</div>
				
				<div className="form-group">
					<button type='submit' className='btn btn-block'>Submit</button>
				</div>
			</form>
          
        </section>
    </>
  )
}

export default Login
