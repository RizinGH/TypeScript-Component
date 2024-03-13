import React, { useState } from 'react'
import '../styles/password_reset.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';


function Password_Reset() {

    const [password, setPassword] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const username = localStorage.getItem("username")
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [open, setOpen] = useState(false)
    const [alertdata, setAlertdata] = useState("")

    
    const [alert, setAlert] = useState("")

    const validatePassword = (passwords:String, newpasswords:String) => {
        if (newpassword.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        else if(newpasswords === passwords){
            return 'New password should not be same as old password'
        }
        return null;
    }

    const handleclose = () => {
        setOpen(false)
      };

    const navigate = useNavigate()

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true)


        const passwordError = validatePassword(password, newpassword)

        if (passwordError) {
            console.error('Validation errors');
            return;
        }
        else{
        axios.post('http://localhost:8000/reset_password',{"username":username,"password":password,"newpassword":newpassword})
        .then((res) => {
            if(res.data === "Password Changed Successfully"){
                console.log(res);
                setOpen(true)
                setAlertdata("Password changed successfully! Please login again to continue")
                setTimeout(() => navigate('/'), 2500);
            }
            else if(res.data === "Your current password is incorrect")
            {
                console.log(res);
                setAlert(res.data)
                
            }
            else{
                console.log("Something happened! Try again later");
                
            }
        })
    }
    }

    return (
        <div className='div'>
            <div className="card">
                <div className="card-content">
                    <h2>Change Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='input'>
                            <label htmlFor="">Current Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={alert ? 'error' : ''} />
                            {alert && <p className="helper-text">{alert}</p>}
                        </div>
                        <div className='input'>
                            <label htmlFor="">New Password</label>
                            <input type="password" required value={newpassword} onChange={(e) => setNewPassword(e.target.value)} className={formSubmitted && validatePassword(password, newpassword)? 'error' : ''}/>
                            {formSubmitted && validatePassword(password, newpassword) && <p className="helper-text">{validatePassword(password, newpassword)}</p>}
                            <Button  size='medium' type='submit' variant='contained' sx={{ minWidth: '200px', bgcolor: '#10a37f', '&:hover': { bgcolor: '#0c8769' }, marginTop: 5 }}>Reset Password</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Link to={'/'}>
                <Button variant='outlined' sx={{ color: 'white', bgcolor: '#10a37f', '&:hover': { bgcolor: '#0c8769'}, position: 'fixed', top: 10, right: 10, fontSize: 14, fontFamily: 'monospace' }}>LogOut</Button>
            </Link>
            <Link to={'/home'}>
                <Button variant='outlined' sx={{ color: 'white', bgcolor: '#10a37f', '&:hover': { bgcolor: '#0c8769'}, position: 'fixed', top: 10, right: 110, fontSize: 14, fontFamily: 'monospace' }}>Home</Button>
            </Link>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleclose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} >
                <MuiAlert onClose={handleclose} severity="success" sx={{ width: '100%', height:'50%' }}>
                    {alertdata}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default Password_Reset
