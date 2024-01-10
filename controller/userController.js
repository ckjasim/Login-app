

const User = require('../model/userdb')
const bycrypt = require('bcrypt')





const scurePassword = async (password) => {
    try {
        const passwordHash = await bycrypt.hash(password, 10)
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }

}


const loadSignUp = async (req, res) => {
    try {
        res.render('signup')
    } catch (error) {
        res.send(error.message)

    }
}
const submit = async (req, res) => {
    try {
        const checkemail= await User.findOne({email:req.body.email})
        if(checkemail){
            res.render('signup',{messages:"Email is already exsit"})
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
            res.render('signup', { messages: "Your login has successfully." })
        } else {
            res.render('signup', { messages: "Your login has failed." })
        }
    }
    } catch (error) {
        console.log(error.message);

    }
}
const loadLogIn = (req, res) => {
    res.render('login')
}
const loginUserVerify = async(req,res)=>{
    try {
        const email =req.body.email
        const password =req.body.password
     const userData = await User.findOne({email:email})
     if(userData){
       const passwordMatch = await bycrypt.compare(password,userData.password)
       if(passwordMatch){
        
 
        if(userData.is_varified === 0){

            res.render('login',{message:'Please Verify your mail!'})
        }else{
            req.session.user_id =userData._id;
            res.redirect('/home')
        }
       }else{
        res.render('login',{messages:"Email and password is incorrect!"})

       }

     }else{
        res.render('login',{messages:"Eamil is not existing"})
     }

        
    } catch (error) {
        console.log(error.message);
        
    }

}
const loadHome = async (req,res)=>{
    try {
       const showUserData=await User.findOne({_id:req.session.user_id})
        res.render('userdashboard',{name:showUserData.name,email:showUserData.email,mobile:showUserData.mobile})
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const logout = (req,res)=>{
    req.session.destroy()
    
    res.redirect("/")

}





module.exports = {

    loadSignUp,
    submit,
    loadLogIn,
    loginUserVerify,
    loadHome,
    logout,
    


}