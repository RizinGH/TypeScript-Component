import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import axios from 'axios'


function Home() {

  const username  = localStorage.getItem('username')
  const [completed, setCompleted] = useState<boolean>(false)
  const [data, setData] = useState<string>("")
 
  useEffect(() => {
    axios.post("http://localhost:8000/home",{"username":username})
    .then((res) => {
      if(res.data === "Profile Completed"){
        setCompleted(true)
        setData(res.data)
      }
      else{
        setData("Click here to complete your profile")
      }
    }).catch((err) => console.log(err))
  },[username])


  return (
    <div className='Home'>
      <h2>Login Successful</h2><br />
      {completed ? (
      <Link to={'/home'} style={{textDecoration:'none', textAlign:'center'}}>
        <div className="card">
          <div className="card-content">
            <h3>Hi,{username}</h3>
            <p>{data}</p>
          </div>
        </div>
      </Link>
      ):(
        <Link to={'/home/form'} style={{textDecoration:'none', textAlign:'center'}}>
        <div className="card">
          <div className="card-content">
            <h3>Hi,{username}</h3>
            <p>{data}</p>
          </div>
        </div>
      </Link>
      )}
      <Link to={'/'}>
      <Button variant='outlined' sx={{color:'white', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769'}, position:'fixed', top:10, right:10, fontSize:14, fontFamily:'monospace'}}>LogOut</Button>
      </Link>
      <Link to={'/reset_password'}>
      <Button variant='outlined' sx={{color:'white', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769'}, position:'fixed', top:10, right:110, fontSize:14, fontFamily:'monospace'}}>Change Password</Button>
      </Link>
    </div>
  )
}

export default Home
