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
    let {jid,uid,applied_on}=req.body;
    let promise=jobmod.applyforjob([jid,uid,applied_on]);
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


 exports.countapplication=((req,res)=>{
    let promise=jobmod.viewapplyCount();
    promise.then((result)=>{
        res.json({status:"count is",joblist:result,msg:""});
    });
    promise.catch((err)=>{
        res.send(err);
    });

 });

 exports.viewuserapplyjob = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
   const uid = parseInt(req.query.uid); 
    let countPromise = jobmod.viewapplyjobCount(uid);
    let dataPromise = jobmod.getPaginatedviewapplyjob(uid,limit, offset);

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

