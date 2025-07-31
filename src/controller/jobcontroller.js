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


exports.deletejob = (req, res) => {
  let id = parseInt(req.query.jid);
  let limit = 10;
  let offset = 0;

  let promise = jobmod.deletejobById(id);

  promise.then((result) => {
    let p = jobmod.getPaginatedjob(limit, offset);

    p.then((joblist) => {
      res.json({
        status: "delete",
        joblist: joblist,
        msg: "Job deleted successfully."
      });
    });

    p.catch((err) => {
      res.json({
        status: "error",
        msg: "not delete.",
        error: err.message
      });
    });

  });
};

exports.jobFinalUpdate = (req, res) => {
    let { jid, company_name, title, description, location, salary, job_type } = req.body;
    
    let promise = jobmod.finalUpdatejob(jid, company_name, title, description, location, salary, job_type);

  promise.then(() => {
    let p = jobmod.getPaginatedjob(10, 0);  

    p.then((hrList) => {
      res.json({
        status: "update",
        joblist: hrList,
        msg: "job updated successfully..."
      });
    });

    p.catch((err) => {
      res.json({
        status: "error",
        msg: "job not update.",
      
      });
    });
  });
};
 exports.searchBytitle=((req,res)=>{
        let name=req.query.title;
        let date=req.query.posted_date_time;
        
    
        let promise=jobmod.getBytitleanddate(name,date);
        promise.then((result)=>{
            res.json({status:"valid",data:result});
    
        }).catch((err)=>{
            res.send("something went wrong"+err.message);
        })

    });



