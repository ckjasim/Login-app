const Admin = require('../model/userdb')
const User = require('../model/userdb')
const bycrypt = require('bcrypt')

//secure password
const scurePassword = async (password) => {
    try {
        const passwordHash = await bycrypt.hash(password, 10)
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }

}

//admin login page
const adminlogin = async(req,res)=>{
    try {
        res.render('adminlogin')
    } catch (error) {
        console.log(error.message);
        
    }
    
}
//checkig the admin or not
const loginAdminVerify= async(req,res)=>{
    try {
        const email=req.body.email
        const password=req.body.password
        const adminData = await Admin.findOne({email:email})
        if(adminData){
            const passwordMatch= await bycrypt.compare(password,adminData.password)
            if(passwordMatch){
                try {
                    if(adminData.is_admin === 0){
                        res.render('adminlogin',{messages:"you are not admin!"})

                    }else{
                        req.session.admin_id =adminData._id;



                        res.redirect('admin/adminWelcome')
                    }

                    
                    
                } catch (error) {
                    console.log(error.message);
                    
                }
            }else{
                res.render('adminlogin',{messages:"Email and password is incorrect!"})
            }

        }else{
            res.render('adminlogin',{messages:"Eamil is not existing"})

        }

        
    } catch (error) {
        
    }
}
//admin welcome page
const adminpage = async (req,res)=>{
    try {
        const userData = await User.find({is_admin:0})
        res.render('admindashboard',{users:userData})
    } catch (error) {
        console.log(error.message);
        
    }
}
//admin logout
const adminlogout = (req,res)=>{
   
    req.session.destroy()
    
    res.redirect('/admin')

}

//admin edit users data
const editUserLoad= async (req,res)=>{
    try {
        const id =req.query.id;
       const userData= await User.findById({_id:id})
       if(userData){
           
           res.render('edit-user',{user:userData})
       }else{
        res.redirect('/admin/adminWelcome')
       }
    } catch (error) {
        console.log(error.message);
        
    }
}
//users data edit and update
const upadateUser= async (req,res)=>{
    try { 
       const user= req.query.id
       
      const userData= await User.findByIdAndUpdate({_id:user},{$set:{ name:req.body.name,email:req.body.email,mobile:req.body.mobile }},{new:true})
      if(userData){
          res.redirect('/admin/adminWelcome')

      }
    } catch (error) {
        console.log(error.message);
        
    }
}
//delete users data
const deleteUser = async (req,res)=>{
    
    const user = req.query.id
    
    
     await User.deleteOne({_id:user})
     console.log('hello')
     res.redirect('/admin/adminWelcome')


}

//create new user page
const createnewuser= async (req,res)=>{
    try {
    
        res.render('create')
    } catch (error) {
        console.log(error.message);
        
    }

}
//create new user
const createUser= async (req,res)=>{
    try {
        const checkemail= await User.findOne({email:req.body.email})
        if(checkemail){

            res.render('create', { messages: "Email already exist" })
        }else{

        
        
            const sPassword = await scurePassword(req.body.password)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: sPassword,
                is_admin: 0,
    
    
            })
            const result = await user.save()
            if (result) {
                // sendVerifyMail(req.body.name,req.body.email,req.body.mobile,result._id)
                res.render('create', { messages: "Your login has successfully." })
            } else {
                res.render('create', { messages: "Your login has failed." })
            }
        }
        
    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports={
    adminpage,
    loginAdminVerify,
    adminlogin,
    adminlogout,
    editUserLoad,
    upadateUser,
    deleteUser,
    createnewuser,
    createUser

    

}

