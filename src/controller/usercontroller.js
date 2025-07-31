let jobmod = require("../model/usermodel");

exports.registeruser=((req,res)=>{
    let {uname,pass,contact,uemail,passoutyear,collegename,skills,experience,role}=req.body;
    let promise=jobmod.registationuser([uname,pass,contact,uemail,passoutyear,collegename,skills,experience,role]);
    promise.then((result)=>{
         res.json({status:"valid",msg: result});
    
    }).catch((err)=>{
        res.json({status:"Not valid",msg: err});
    });
});

exports.applyjob=((req,res)=>{
    let {job_id,uid}=req.body;
    let promise=jobmod.applyforjob([job_id,uid]);
    promise.then((result)=>{
         res.json({status:"apply job",msg: result});
    
    }).catch((err)=>{
        res.json({status:"Not apply job",msg: err});
    });
});

exports.viewapplyjob = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    let countPromise = jobmod.viewapplyCount();
    let dataPromise = jobmod.getPaginatedviewapply(limit, offset);

    countPromise.then((totalCount) => {
        dataPromise.then((result) => {
            res.json({
                status: "view",
                joblist: result,
                pagination: {
                    totalUsers: totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                    currentPage: page
                }
            });
        }).catch((err) => {
            res.json({ status: "not view", msg: err });
        });
    }).catch((err) => {
        res.json({ status: "not view", msg: err });
    });
};
