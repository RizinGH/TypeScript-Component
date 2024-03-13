import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Typography  , Card, CardContent, CardActions, TextField, Select, MenuItem, InputLabel, FormControl, Snackbar } from '@mui/material';
import '../styles/login_register.css'
import MuiAlert from '@mui/material/Alert';



export default function Registerform() {

  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [open , setOpen] = useState(false)
  const [alert , setAlert] = useState(null)


  function validateUsername(username: string): string | null {
    if (username.length < 3 || username.trim() === '') {
      return 'Username must be at least 3 characters long';
    }
    return null;
  }
  
  function validateAddress(address: string): string | null {
    if (!address || address.trim() === '') {
      return 'Address is required';
    }
    return null;
  }
  
  function validateGender(gender: string): string | null {
    if (!gender) {
      return 'Gender is required';
    }
    return null;
  }
  
  function validatePassword(password: string): string | null {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  }
  
  function valiadateConfirmPassword(password: string, confirmpassword: string): string | null {
    if (confirmpassword !== password) {
      return 'Should be same as password';
    }
    return null;
  }

  const navigate = useNavigate()

  const handleSumit= (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true)

    const data = {
      "username" : username,
      "address" : address,
      "gender" : gender,
      "password" : password,
    }

    const usernameError = validateUsername(username);
    const addressError = validateAddress(address);
    const genderError = validateGender(gender);
    const passwordError = validatePassword(password);
    const confirmpasswordError = valiadateConfirmPassword(password,confirmpassword)

    if (usernameError || addressError || genderError || passwordError || confirmpasswordError) {
      console.error('Validation errors');
      return;
    }
    else {
      axios.post('http://localhost:8000/register', data)
      .then((res) => {
        if(res.data === 'username already taken'){
          setAlert(res.data)
        }
        else{
          setOpen(true)
          setTimeout(() => navigate('/') , 2500);
        }
      }).catch((err) => console.log(err))
    }
  }

  const handleclose = () => {
    setOpen(false)
  };

  return (
    <div className='regdiv'>
      <Box sx={{ width:'400px', height:'auto'}}>
        <Card variant="outlined" sx={{borderRadius:3,marginBottom:3,  boxShadow:'0.1px 0.1px 1px 1px'}}>
          <form onSubmit={handleSumit}>
            <CardContent>
              <Typography variant='h4' color="text.primary" sx={{fontWeight:'bold', padding:2, fontFamily:'monospace'}} gutterBottom>
                Register
              </Typography>
              <TextField id="standard-basic" label='Username' variant="standard" type='text' required aria-required value={username} onChange={(e) => setUsername(e.target.value)} error={(formSubmitted && !!validateUsername(username))|| (formSubmitted && alert) || false }
                helperText={(formSubmitted ? validateUsername(username): '')||(formSubmitted ? alert: '')} sx={{marginTop:2, minWidth:'300px'}} />
              <TextField  id="standard-multiline-static" label='Address' multiline variant="standard" type='text' required aria-required value={address} onChange={(e) => setAddress(e.target.value)} error={formSubmitted && !!validateAddress(address)}
                helperText={formSubmitted ? validateAddress(address): ''} sx={{marginTop:2, minWidth:'300px'}} />
              <FormControl variant="standard" sx={{ marginTop:2, minWidth: '300px', textAlign:'start' }}>
                <InputLabel id="demo-simple-select-standard-label" required aria-required>Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                  required aria-required
                  error={formSubmitted && !!validateGender(gender)}
                  
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
              <TextField id="standard-basic" label='Password' variant="standard" type='password' required aria-required value={password} onChange={(e) => setPassword(e.target.value)} error={formSubmitted && !!validatePassword(password)}
                helperText={formSubmitted ? validatePassword(password): ''} sx={{marginTop:2, minWidth:'300px'}} />
              <TextField id="standard-basic" label='Confirm Password' variant="standard" type='password' required aria-required value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} error={formSubmitted && !!valiadateConfirmPassword(password, confirmpassword)}
                helperText={formSubmitted ? valiadateConfirmPassword(password, confirmpassword): ''} sx={{marginTop:2, minWidth:'300px'}} />
            </CardContent>
            <CardActions sx={{display:'flex', flexDirection:'column', marginTop:3}}>
              <Button size='medium' type='submit' variant='contained' sx={{minWidth:'300px', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769'}}}>Register</Button>
              <Link to={'/'} style={{padding:20, color:'#2e63b3', fontSize:16}} >
                Already have an account? Log in
              </Link> 
            </CardActions>
          </form>
        </Card>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleclose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <MuiAlert onClose={handleclose}  severity="success" sx={{ width: '100%' }}>
          Registration Successfull. Navigating to login page
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

