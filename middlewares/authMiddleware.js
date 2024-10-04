exports.isLoggedIn = async ( req,res,next)=>{
    // check if user is authenticated
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}