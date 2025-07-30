let jobmod = require("../model/HRmodel");

exports.HRadd=((req,res)=>{
    let {hname,pass,email,contact_number,company_name,experience,role}=req.body;
    let promise=jobmod.saveHRData([hname,pass,email,contact_number,company_name,experience,role]);
    promise.then((result)=>{
         res.json({status:"valid",msg: result});
    
    }).catch((err)=>{
        res.json({status:"Not valid",msg: err});
    });
});

exports.viewHR = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    let countPromise = jobmod.getHRCount();
    let dataPromise = jobmod.getPaginatedHR(limit, offset);

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
exports.deleteHr = (req, res) => {
  let id = parseInt(req.query.jid);
  let limit = 10;
  let offset = 0;

  let promise = jobmod.deleteHrById(id);

  promise.then((result) => {
    let p = jobmod.getPaginatedHR(limit, offset);

    p.then((joblist) => {
      res.json({
        status: "delete",
        joblist: joblist,
        msg: "HR deleted successfully."
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



  
  exports.updateHrview=(req,res)=>{
    res.json("valid",{hname:req.query.hname,
                                pass:req.query.pass,
                                email:req.query.email,
                                contact_number:req.query.contact_number,
                                 company_name:req.query.company_name,
                                 experience:req.query.experience,
                                 role:req.query.role,
                                 hid:req.query.hid
    });

}

exports.HrFinalUpdate = (req, res) => {
  let { hid, hname, pass, email, contact_number, company_name, experience, role } = req.body;

  let promise = jobmod.finalUpdate(hid, hname, pass, email, contact_number, company_name, experience, role);

  promise.then(() => {
    let p = jobmod.getPaginatedHR(10, 0);  

    p.then((hrList) => {
      res.json({
        status: "update",
        joblist: hrList,
        msg: "HR updated successfully..."
      });
    });

    p.catch((err) => {
      res.json({
        status: "error",
        msg: "HR not update.",
      
      });
    });
  });
};


    exports.searchByName=((req,res)=>{
        let hname=req.query.hname;
        
    
        let promise=jobmod.getByName(hname,);
        promise.then((result)=>{
            res.json(result);
    
        }).catch((err)=>{
            res.send("something went wrong");
        })

    });






 


