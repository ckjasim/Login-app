const islogin = async (req,res,next)=>{
    try {

        if(!req.session.user_id){
            res.redirect('/')
            
        }
    

       next()
        
    } catch (error) {
        console.log(error.message+"middleware")
        
    }
}

const   islogout = async (req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect('/home')
        }else{
            next()

        }
        

        
    } catch (error) {
        console.log(error.message+"middlewarrrrrrrrrrrre")
        
    }
}
const islogoutadmin = async (req,res,next)=>{
    try {
        if(req.session.admin_id){
            res.redirect('/admin/adminWelcome')
        }else{
            next()

        }
        

        
    } catch (error) {
        console.log(error.message)
        
    }

}
const isloginadmin = async (req,res,next)=>{
    try {

        if(!req.session.admin_id){
            
            res.redirect('/admin')
            
        }else{

            next()
        }
    

        
    } catch (error) {
        console.log(error.message+"middleware")
        
    }
}



module.exports={
    islogout,
    islogin,
    isloginadmin,
    islogoutadmin
    

}