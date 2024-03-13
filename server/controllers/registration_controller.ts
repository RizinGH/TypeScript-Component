const RegistrationModel = require('../models/registration_model')
import {Request, Response} from 'express'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async(req:Request, res:Response) => {
    const { username, address, gender, password } = req.body

    RegistrationModel.findOne({username})
    .then((response:Response) => {
        if(response){
           return res.json("username already taken")
        }
        else{
            bcrypt.hash(password, 10)
            .then((hash:Response) => {
                RegistrationModel.create({ username:username, address:address, gender:gender, password:hash})
                .then((user:Response) => {
                    console.log("Registration Successfull...");
                    res.send(user)  
                }).catch((err:Error) => console.log(err))
            })
        }
    }).catch((err:Error) => console.log(err))
}

module.exports.login = async(req:Request, res:Response) => {
    const { username, password } = req.body
    RegistrationModel.findOne({username:username})
    .then((user:any) => {
        if(user){
            bcrypt.compare(password, user.password, (err:Error, response:Response) => {
                if(response) {
                    const token = jwt.sign({username:user.username},
                        "jwt-secret-key", {expiresIn:'1d'})
                        return res.json({Status:'success','username':username ,'token':token})
                }
                else{
                    return res.json("Incorrect Password")
                }
            })
        }
        else{
            return res.json("User not found")
        }
    })
}

module.exports.reset_password = async(req:Request, res:Response) => {
    const {username, password, newpassword} = req.body
    RegistrationModel.findOne({username:username})
    .then((resp:any) => {
        if(resp){
            bcrypt.compare(password, resp.password, (err:Error, response:Response) => {
                if (response) {
                    bcrypt.hash(newpassword, 10)
                        .then((hash:Response) => {
                            RegistrationModel.updateOne({ username: username },{ password: hash })
                                .then((changed:Response) => {
                                    return res.json("Password Changed Successfully")
                                }).catch((err:Error) => console.log(err))
                        }).catch((err:Error) => console.log(err))
                }
                else {
                    return res.json("Your current password is incorrect")
                }
            })
        }
        else{
            return res.json("Something happened! Try again later")
        }
        }).catch((err:Error) => console.log(err))
}