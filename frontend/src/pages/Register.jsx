import {useState,useEffect} from 'react' 
import {FaUser} from 'react-icons/fa'
function Register() {
    
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        password2:''
    })
    const {name,email,phone,password,password2} = formData
	const onChange =(e)=>{
		setFormData((prevState)=>({
			...prevState,
			[e.target.name]:e.target.value
		}))
	}
	const onSubmit =(e)=>{
		e.preventDefault()
	}
  return (
   <>
        <section className='heading'>
			<h1> <FaUser/> Register</h1>
			<p>Please create an account </p>
        </section>
        <section className="form">
			<form action="" onSubmit={onSubmit}>
				<div className="form-group">
					<input type="text" className="form-control" id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="mobile" className="form-control" id='phone ' name ='phone ' value={phone } placeholder='Enter your phone number ' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="text" className="form-control" id='password' name='password' value={password} placeholder='Confirm password' onChange={onChange}  />
				</div>
				<div className="form-group">
					<button type='submit' className='btn btn-block'>Submit</button>
				</div>
			</form>
          
        </section>
    </>
  )
}

export default Register
