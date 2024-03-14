import React, { useState,useEffect } from 'react';
import {FaSignInAlt, FaSearch,FaTimes } from 'react-icons/fa';
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import { editUser,getUsers,resetAdmin,toggleUser,deleteUser } from '../../features/admin/adminSlice';
import { register,reset } from '../../features/auth/authSlice';


function Table({ usersData }) {
  const [showModal, setShowModal] = useState(false);
  const [showCreateUserModal, setCreateUserModal] = useState(false);
  const [editUserData,setEditUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
	const dispatch = useDispatch()

	const [createUserData,setCreateUserData] = useState({
		name:'',
		email:'',
		phone:'',
		password:'',
		password2:''
	})
	const {name,email,phone,password,password2} = createUserData

	const {admin,isError,isSuccess,isLoading,message,users} = useSelector((state) => state.admin) 

  // Handler to show the modal
  const handleEditUser = (userData) => {
    setEditUserData(userData)
    setShowModal(true);
  };

  useEffect (()=>{

	  dispatch(getUsers())
		if(isError){
			toast.error(message)
		}
		if(isSuccess ){
			toast.success(message)
		}
		dispatch(resetAdmin())
	},[isError,isSuccess,dispatch])
 

  // Handler to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onChangeEdit = (e)=>{
    setEditUserData((prevState)=>({
			...prevState,
			[e.target.name]:e.target.value
		}))
  }

  const blockUser = (id)=>{
    dispatch(toggleUser(id))
  }
  const handleDeleteUser = (id)=>{
    dispatch(deleteUser(id))
  }
  const submitEditUser =(e)=>{
		e.preventDefault()
		if(!editUserData.name.trim() || !editUserData.email.trim()) {
			toast.error("Please fill all the fileds")
 		} else {
			dispatch(editUser(editUserData))
		}
	}

	// Create user 
  const createUser = ()=>{
    setCreateUserModal(true)
  }




const onChangeCreate =(e)=>{
	setCreateUserData((prevState)=>({
		...prevState,
		[e.target.name]:e.target.value
	}))
}
const onSubmitCreateUser =(e)=>{
	e.preventDefault()
	if(!name.trim() || !email.trim() || !password.trim() || !password2.trim() || !phone.trim()) {
		toast.warning("Please fill all the fields")
	} else {
		if(password !== password2){
			toast.error('Password do not match')
		} else {

			const userData = {
				name,
				email,
				phone,
				password
			}
			dispatch(register(userData))
			.then(() => {
	  			dispatch(getUsers())
				toast.success("User registered successfully");
			})
			.catch(error => {
				console.error("Registration failed:", error);
				toast.error("Failed to register user");
			});
			setCreateUserModal(false)
			dispatch(reset())
		}
	
	}
}


  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
);
 
  return (
    <div className='mt-5'>
       <div className=" d-flex justify-content-between align-items-center  border rounded border-dark font-weight-bold m-2 p-2">
               
                <div className='justify-content-start' style={{width:'70%'}}>
					<FaSearch className='m-2' style={{width:'2rem',height:'2rem'}}/>
                <input
                    className='userSearch'
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
               
                <button className='btn' onClick={createUser}> Create user</button>
            </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <img style={{ borderRadius: '50%', width: '100px', height: '100px' }} src={user.image ? '../../user/' + user.image : "https://tse3.mm.bing.net/th?id=OIP.K8yunvrQA8a0MY5khxh_iQHaFR&pid=Api&P=0&h=180"} alt="Profile image" />
                </td>
                <td className='font-weight-bold'>{user.name}</td>
                <td className='font-weight-bold'>{user.email}</td>
                <td className='font-weight-bold'>{user.phone}</td>
                <td>{user.isActive?<p className='text-success font-weight-bold'>Active</p>:<p className='text-danger font-weight-bold '>Not Active</p>}</td>
                <td>
                  <button className='btn m-1 ' style={{ backgroundColor: 'white', color: 'black', width: '10rem', height: '2rem' }} onClick={()=>handleEditUser(user)}>Edit user</button>
                  <button className='btn m-1' style={{ width: '10rem', height: '2rem' }} onClick={()=>blockUser(user._id)} >{user.isActive?'Block user':'Unlock User'}</button>
                  <button className='btn m-1 ' style={{ width: '10rem', height: '2rem' ,backgroundColor:'red'}} onClick={()=>handleDeleteUser(user._id)} >Delete User</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     

      
       {
        showModal && 
        <div className="modalk">
        <div className="modal-content">
         
          <section className='heading'>
			<h1> Edit User <FaTimes onClick={handleCloseModal} style={{}} /></h1> 
            
          {/* <span className="close" onClick={handleCloseModal}>&times;</span> */}
         </section>
      

          <section className="form">
			<form action="" onSubmit={submitEditUser} >
				
				<div className="form-group">
					<input type="text" className="form-control" id='name' name='name' value={editUserData ? editUserData.name :"" } placeholder='Enter your email' onChange={onChangeEdit}  />
				</div>
                
				<div className="form-group">
					<input type="email" className="form-control" id='email' name='email' value={editUserData ? editUserData.email :"" } placeholder='Enter your email' onChange={onChangeEdit}  />
				</div>
				
				<div className="form-group">
					<input type="tel" pattern="[0-9]{10}"  className="form-control" id='phone' name='phone' value={editUserData ? editUserData.phone :"" } placeholder='Enter your mobile' onChange={onChangeEdit}  />
				</div>
				
				<div className="form-group">
					<button type='submit' className='btn btn-block'>Submit</button>
				</div>
			</form>
          
        </section>
        </div>
      </div>
       }


      {
          showCreateUserModal && 
          <div className="modalk">
          <div className="modal-content">
          
            <section className='heading'>
        <h1> Create User <FaTimes className='' onClick={()=>setCreateUserModal(false)} style={{cursor:'pointer'}} /></h1> 
              
            {/* <span className="close" onClick={handleCloseModal}>&times;</span> */}
          </section>
        

            <section className="form">
        <form action="" onSubmit={onSubmitCreateUser} >
          
          <div className="form-group">
			<span className=' d-flex font-weight-bold'>User name</span>
            <input type="text" className="form-control" id='name' name='name' value={createUserData.name} placeholder='Enter your name' onChange={onChangeCreate}  required />
          </div>
                  
          <div className="form-group">
		  <span className=' d-flex font-weight-bold'>Email</span>
            <input type="email" className="form-control" id='email' name='email' value={createUserData.email} placeholder='Enter your email' onChange={onChangeCreate}  required />
          </div>
          
          <div className="form-group">
		  <span className=' d-flex font-weight-bold'>Phone number</span>
            <input type="tel" pattern="[0-9]{10}"  className="form-control" id='phone' name='phone' value={createUserData.phone} placeholder='Enter your mobile' onChange={onChangeCreate}  required />
          </div>

          <div className="form-group">
		  <span className=' d-flex font-weight-bold'>Password</span>
            <input type="password"  className="form-control" id='password' name='password' value={createUserData.password} placeholder='Enter your password' onChange={onChangeCreate}  required />
          </div>

          <div className="form-group">
		  <span className=' d-flex font-weight-bold'>Confirm password</span>
            <input type="password"   className="form-control" id='password2' name='password2' value={createUserData.password2} placeholder='Confirm password' onChange={onChangeCreate}  required />
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>

        </form>
            
          </section>
          </div>
        </div>
       }
    
    </div>
  );
}

export default Table;
