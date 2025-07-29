let express=require("express");

let jobportal=require("../controller/logincontroller");
let Hrportal=require("../controller/HRcontroller");
let router=express.Router();

router.post("/loginadmin",jobportal.adminlogin);
router.post("/hrlog",jobportal.loginhr);
router.post("/loginuser", jobportal.userlogin); 
router.post("/addHr", Hrportal.HRadd);
router.get("/view",Hrportal.viewHR);
router.get("/detelehr",Hrportal.deleteHR);
router.get("/update",Hrportal.updateHrview);
router.post("/upddate",Hrportal.HrFinalUpdate);
router.get("/searchHRpByName",Hrportal.searchByName);




module.exports=router;