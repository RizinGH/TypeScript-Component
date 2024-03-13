import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Box, Typography, Card, CardContent, CardActions, TextField } from '@mui/material';
import '../styles/login_register.css'

export default function Loginform() {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertdata, setAlertdata] = useState<string>("")
  const [alert, setAlert] = useState<string>("")
  const navigate = useNavigate()


  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post("http://localhost:8000/login", {'username':username,'password':password})
    .then((res) => {
      console.log(res.data);
      if(res.data.token){
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('username',res.data.username)
        navigate('/home')
      }
      else if(res.data === "Incorrect Password"){
        setAlertdata(res.data)
        setAlert(res.data)
      }
      else{
        setAlertdata(res.data)
        setAlert(res.data)
      }
    }).catch((err) => console.log(err))
  }

  return (
      <div className='div'>
        <Box sx={{minWidth:'420px'}}>
        <Card variant="outlined" className='card' sx={{borderRadius:3,marginBottom:3, boxShadow:'0.1px 0.1px 1px 1px'}}>
          <form onSubmit={handleSumit}>
          <CardContent>
            <Typography variant='h4' color="text.primary" sx={{fontWeight:'bold', padding:2, fontFamily:'monospace'}} gutterBottom>
              Login
            </Typography>
            {alert === "User not found" ? (
            <TextField id="standard-basic" label='Username' type='text' variant="standard" required aria-required value={username} onChange={(e) => setUsername(e.target.value)} error={true} helperText={alertdata} sx={{marginTop:4, minWidth:'300px'}} />
            ):(
              <TextField id="standard-basic" label='Username' type='text' variant="standard" required aria-required value={username} onChange={(e) => setUsername(e.target.value)} sx={{marginTop:4, minWidth:'300px'}} />
            )}
            {alert === "Incorrect Password" ? (
            <TextField id="standard-basic" label='Password' type='password' variant="standard" required aria-required value={password} onChange={(e) => setPassword(e.target.value)} error={true} helperText={alertdata} sx={{marginTop:4,outline:'none', minWidth:'300px'}} />
            ):(
              <TextField id="standard-basic" label='Password' type='password' variant="standard" required aria-required value={password} onChange={(e) => setPassword(e.target.value)} sx={{marginTop:4, minWidth:'300px'}} />
            )}
          </CardContent>
          <CardActions sx={{display:'flex', flexDirection:'column', marginTop:3}}>
            <Button size='medium' type='submit' variant='contained' sx={{minWidth:'300px', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769'} }}>Login</Button>
            <Link to={'/register'} style={{padding:20, color:'#2e63b3', fontSize:16}}>
               Don't have an account? Sign up
            </Link> 
          </CardActions>
          </form>
        </Card>
        </Box>  
      </div>
  )
}
