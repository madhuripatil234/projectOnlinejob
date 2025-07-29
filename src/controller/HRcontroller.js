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


  exports.deleteHR=((req,res)=>{
        let id=parseInt(req.query.hid);
        let promise=jobmod.deleteHrById(id);
         promise.then((result)=>{
         let p=jobmod.getAllHR();
        p.then((result)=>{
            res.json({status:"delete",joblist:result,msg:"HR detele succesfully.."});

        });
        p.catch((err)=>{
            res.json({status:"not delete",msg:"not delete.."});

        }); 

    });

 });

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

exports.HrFinalUpdate=(req,res)=>{
    let { hid, hname, pass, email, contact_number, company_name, experience, role } = req.body;
    let promise = jobmod.finalUpdate(hid, hname, pass, email, contact_number, company_name, experience, role);
         promise.then((result)=>{
        let p=jobmod.getAllHR();
        p.then((result)=>{
            res.json("update",{joblist:result,msg:"update HR successfully..."});
        })

        });
        promise.catch((err)=>{
            res.send("HR not update");

        }); 
    }

     exports.searchByName=((req,res)=>{
        let hname=req.query.hname;
        
    
        let promise=jobmod.getByName(hname,);
        promise.then((result)=>{
            res.json(result);
    
        }).catch((err)=>{
            res.send("something went wrong");
        })

    });






 


