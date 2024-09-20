import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = (req,res)=>{

    //check for existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err,data)=>{
        if(err){
            console.log(err)
            return res.status(500).json(err)
        }
        if(data.length){
            return res.status(409).json("User already exists")
        }
        
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        //create user
        const q = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(q,[values],(err,data)=>{
            if(err){
                console.log(err)
                return res.status(500).json(err)
            } 
            return res.status(200).json("User created")
        })
    
    })


}

export const login = (req,res)=>{
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q,[req.body.username],(err,data)=>{
        if (err) return res.json(err)
        if(!data.length) return res.status(404).json("User not found")

        //check password
        const validPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!validPassword) return res.status(400).json("Username or password is incorrect")
        
        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: "1d" });
        const { password, ...user } = data[0]; 
    
        
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        }).status(200).json({ user, token });
        });
}

export const logout = (req,res)=>{
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: process.env.NODE_ENV === "production", 
      })
      .status(200)
      .json("User has been logged out");
}