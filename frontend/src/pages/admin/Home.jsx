import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() { 

  const navigate = useNavigate()

  const {admin} = useSelector((state) => state.admin) 

  useEffect(()=>{
    if(!admin) {
      navigate('/adminLogin')
    }
  },[admin,navigate])
  return (
    <div>
      <h2>Admin Home</h2>
      {
        admin&&<h1>Welcome {admin.name}</h1>
      }
    </div>
  )
}

export default Dashboard
