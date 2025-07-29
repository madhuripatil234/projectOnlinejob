let express=require("express");
let jobportal=require("../controller/logincontroller");
let router=express.Router();
router.post("/loginadmin",jobportal.adminlogin);
router.post("/hrlog",jobportal.loginhr);
router.post("/loginuser", jobportal.userlogin); 

module.exports=router;