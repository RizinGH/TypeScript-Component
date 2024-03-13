const ProfileModel = require('../models/profile_model')
import {Request, Response} from 'express'
require('dotenv').config()
const axios = require('axios')

const SITE_SECRET = process.env.SITE_SECRET

module.exports.profile = async (req:Request, res:Response) => {
    const { captchaValue, username, name, email, password, dob, age, gender, address, color } = req.body
    const { data } = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`,
    )
    if (data.success) {
        ProfileModel.findOne({ username: username })
            .then((user:Response) => {
                if (user) {
                    return res.json("User details already present")
                }
                else {
                    const filedata = req.file?.filename 
                    ProfileModel.create({ username: username, name: name, email: email, password: password, dob: dob, age: age, gender: gender, address: address, color: color, file: filedata })
                        .then((response:Response) => {
                            return res.json("Successfully completed")
                        }).catch((err:Error) => console.log(err))
                }
            })

    }
    else {
        return res.send("Error Validating reCAPTCHA")
    }
}

module.exports.formcompleted = (req:Request, res:Response) => {
    const { username } = req.body
    ProfileModel.findOne({ username: username })
        .then((data:Response) => {
            if (data) {
                return res.json("Profile Completed")
            }
            else {
                return res.json("Profile Incomplete")
            }
        }).catch((err:Error) => console.log(err))
}

module.exports.getenv = (req:Request, res:Response) => {
    return res.send(process.env.REACT_APP_SITE_KEY)
}