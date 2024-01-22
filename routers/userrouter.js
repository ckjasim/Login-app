const express =require ('express')
const userRoute=express()
const userController = require('../controller/userController')

const authantification =require('../middleware/authantification')





userRoute.set('views','./views/users')
//login route
// userRoute.get('/',authantification.islogout,userController.loadLogIn)
userRoute.get('/',authantification.islogout,userController.loadLogIn)

userRoute.get('/home',authantification.islogin,userController.loadHome)

userRoute.post('/',userController.loginUserVerify)


userRoute.post('/logout',userController.logout)


// userRoute.get('/home',authantification.islogin,userController.loadHome)
//singup route
userRoute.get('/signup',userController.loadSignUp) 
userRoute.post('/signup',userController.submit)

 

//userForget password
userRoute.get('/forget',authantification.islogout,userController.loadForget)
userRoute.post('/forget',userController.forgetSubmit)

// route.get('/login',usercontroller.login)
// route.post('/login',usercontroller.insertdbclient)
// userRoute.get('/login',(req,res)=>{
//         res.render('login')
// })

// userRoute.post('/login',userController.insertdbclient)



module.exports=userRoute;