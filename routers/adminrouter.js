const express= require('express')
const adminRouter=express()
const adminController= require('../controller/adminController')
const authantification =require('../middleware/authantification')


adminRouter.set('views','./views/admin')

adminRouter.get('/',authantification.islogoutadmin,adminController.adminlogin)

adminRouter.post('/',adminController.loginAdminVerify)
adminRouter.get('/adminWelcome',authantification.isloginadmin,adminController.adminpage)

adminRouter.post('/adminlogout',adminController.adminlogout)

adminRouter.get('/edit-user',authantification.isloginadmin,adminController.editUserLoad)
adminRouter.post('/edit-user',adminController.upadateUser)
//TO DELETE USER 
adminRouter.post('/delete-user',adminController.deleteUser)


adminRouter.get('/create-user',authantification.isloginadmin,adminController.createnewuser) 
adminRouter.post('/create-user',adminController.createUser)
// adminRouter.get('*',adminController.adminlogin)


module.exports=adminRouter
