const express= require("express")
const router= express.Router()
const users = require("../models/userSchema");

router.post("/register",  async(req,res)=>{
     console.log(req.body);
    const {f_name,l_name,email,phone} = req.body;
   
    if(!f_name || !l_name ||  !email || !phone){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser = new users(
                req.body
            );

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata with filters

router.get("/getdata",async(req,res)=>{
     const { f_name, l_name, email, phone } = req.query;
        const filters = {};
        if (f_name) filters.f_name = f_name;
        if (l_name) filters.l_name = l_name;
        if (email) filters.email = email;
        if (phone) filters.phone = phone;
    try {
        const userdata = await users.find(filters);
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports= router;
