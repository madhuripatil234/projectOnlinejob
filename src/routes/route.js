let express=require("express");
let loginportal=require("../controller/logincontroller");
let Hrportal=require("../controller/HRcontroller");
let jobportal=require("../controller/jobcontroller");

let router=express.Router();

router.post("/loginadmin",loginportal.adminlogin);
router.post("/hrlog",loginportal.loginhr);
router.post("/loginuser", loginportal.userlogin); 
router.post("/addHr", Hrportal.HRadd);
router.get("/view",Hrportal.viewHR);
router.get("/detelehr",Hrportal.deleteHR);
router.get("/update",Hrportal.updateHrview);
router.post("/upddate",Hrportal.HrFinalUpdate);
router.get("/searchHRpByName",Hrportal.searchByName);
router.post("/addjobs",jobportal.jobadd);
router.get("/detelejob",jobportal.deletejob);
router.get("/viewjobs",jobportal.viewjob);





module.exports=router;