import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import { getUsers,resetAdmin } from '../../features/admin/adminSlice'
import Table from '../../components/admin/table'
function Dashboard() { 

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {admin} = useSelector((state) => state.admin) 
  const {users,isLoading,isError,isSuccess,message} = useSelector((state) => state.admin)
  console.log('goals :',users)
  console.log('goals :',users[0])
  console.log('goals :',typeof(users[0]))

  useEffect(()=>{
   
    if(isError){
        toast.error(message)
    }
    if(isSuccess){
      toast.error(message)
  }
    if(!admin) {
      navigate('/adminLogin')
    }
    dispatch(getUsers())

    return () =>{
        dispatch(resetAdmin())
    }
  },[admin,navigate])

  if(isLoading){
   return  <Spinner/>
}
  return (
    <div>
      <h2>Admin Home</h2>
      {
        admin&&<h1>Welcome {admin.name}</h1>
      }
      <Table usersData={users}/>
      {/* {
            users && <>
                {users.map((user)=>{
                    return (
                      <div className='goal'>
                        <h2>{user.name}</h2>
                        <h2>{user.email}</h2>
                        <h2>{user.phone}</h2>
                        <h2>{user.createdAt}</h2>
                      </div>
                    )
                })}
            </>
           } */}


   
      
      
    </div>
  )
}

export default Dashboard
