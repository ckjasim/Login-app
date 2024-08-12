const express =require ('express')
const userRoute=express()
const userController = require('../controller/userController')

const authantification =require('../middleware/authantification')





userRoute.set('views','./views/users')


userRoute.get('/',authantification.islogout,userController.loadLogIn)

userRoute.get('/home',authantification.islogin,userController.loadHome)

userRoute.post('/',userController.loginUserVerify)


userRoute.post('/logout',userController.logout)


// userRoute.get('/home',authantification.islogin,userController.loadHome)
//singup route
userRoute.get('/signup',userController.loadSignUp) 
userRoute.post('/signup',userController.submit)
userRoute.post('/')





module.exports=userRoute;