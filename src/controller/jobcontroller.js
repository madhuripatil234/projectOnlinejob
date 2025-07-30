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

exports.viewjob = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    let count = jobmod.getjobCount();
    let data= jobmod.getPaginatedjob(limit, offset);

    count.then((totalCount) => {
        data.then((result) => {
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


exports.deletejob=((req,res)=>{
        let id=parseInt(req.query.jid);
        let promise=jobmod.deletejobById(id);
         promise.then((result)=>{
         let p=jobmod.getAlljob();
        p.then((result)=>{
            res.json({status:"delete",joblist:result,msg:"job detele succesfully.."});

        });
        p.catch((err)=>{
            res.json({status:"not delete",msg:"not delete.."});

        }); 

    });

 });