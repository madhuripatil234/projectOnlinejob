let express=require("express");
let loginportal=require("../controller/logincontroller");
let Hrportal=require("../controller/HRcontroller");
let jobportal=require("../controller/jobcontroller");
let userportal=require("../controller/usercontroller");
let router=express.Router();

router.post("/loginadmin",loginportal.adminlogin);
router.post("/hrlog",loginportal.loginhr);
router.post("/loginuser", loginportal.userlogin); 
router.post("/contactpage",loginportal.contact_us);
router.get("/viewcontact_us",loginportal.viewcontact_us);

router.post("/addHr", Hrportal.HRadd);   
router.get("/view",Hrportal.viewHR);
router.get("/detelehr",Hrportal.deleteHr);
//router.get("/update",Hrportal.updateHrview);
router.post("/upddate",Hrportal.HrFinalUpdate);
router.get("/searchHRpByName",Hrportal.searchByName);
router.post("/interviewscheduled",Hrportal.interviewtime);

router.post("/addjobs",jobportal.jobadd);
router.get("/viewjobs",jobportal.viewjob);
router.get("/detelejob",jobportal.deletejob);
router.post("/upddatejob",jobportal.jobFinalUpdate);
router.get("/searchjobpBytitle",jobportal.searchBytitle);

router.post("/userregister",userportal.registeruser);
router.post("/userapplyjob",userportal.applyjob);
router.get("/viewuserapplyjob",userportal.viewapplyjob);
router.get("/viewuserapplyhistory",userportal.viewuserapplyjob);

router.get("/totalapplication",userportal.countapplication);

module.exports=router;