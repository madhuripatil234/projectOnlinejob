let jobmod = require("../model/loginmodel");

exports.adminlogin = (req, res) => {
    let {aname, pass, role } = req.body;

    let promise = jobmod.adminData(aname, pass,role);

    promise.then((result) => {
        res.json({ status: "valid", msg: result });
    }).catch((err) => {
        res.json({ status: "invalid", msg: err });
    });
};

exports.loginhr = (req, res) => {
    let {hname, pass, role } = req.body;

    let promise = jobmod.hrData(hname, pass,role);

    promise.then((result) => {
        res.json({ status: "valid", msg: result });
    }).catch((err) => {
        res.json({ status: "invalid", msg: err });
    });
};

exports.userlogin = (req, res) => {
    let {uname, pass, role } = req.body;

    let promise = jobmod.userData(uname,pass,role);

    promise.then((result) => {
        res.json({ status: "valid", msg: result });
    }).catch((err) => {
        res.json({ status: "invalid", msg: err });
    });
};

 exports.contact_us=((req,res)=>{
    let {name,email,subject,message,submitted_at}=req.body;
    let promise=jobmod.contact([name,email,subject,message,submitted_at]);
    promise.then((result)=>{
         res.json({status:"valid",msg: result});
    
    }).catch((err)=>{
        res.json({status:"Not valid",msg: err});
    });
});

exports.viewcontact_us = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    let countPromise = jobmod.getcontactCount();
    let dataPromise = jobmod.getPaginatedcontact(limit, offset);

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

