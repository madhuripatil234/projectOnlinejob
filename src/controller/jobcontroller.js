let jobmod = require("../model/jobmodel");

exports.jobadd=((req,res)=>{
    let {company_name,title,description,location,salary,job_type,hid}=req.body;
    let promise=jobmod.savejobData([company_name,title,description,location,salary,job_type,hid]);
    promise.then((result)=>{
         res.json({status:"add job",msg: result});
    
    }).catch((err)=>{
        res.json({status:"Not add job",msg: err});
    });
});