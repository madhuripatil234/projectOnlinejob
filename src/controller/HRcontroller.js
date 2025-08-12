let jobmod = require("../model/HRmodel");
const adminsendmail = require('../config/mail.js');


exports.HRadd=((req,res)=>{
    let {name,pass,email,contact_number,company_name,experience,role}=req.body;
    let promise=jobmod.saveHRData([name,pass,email,contact_number,company_name,experience,role]);
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
  let id = parseInt(req.query.hid);
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
  let { hid, name, pass, email, contact_number, company_name, experience, role } = req.body;

  let promise = jobmod.finalUpdate(hid, name, pass, email, contact_number, company_name, experience, role);

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
        let name=req.query.name;
        
    
        let promise=jobmod.getByName(name,);
        promise.then((result)=>{
            res.json(result);
    
        }).catch((err)=>{
            res.send("something went wrong");
        })

    });


exports.interviewtime = async (req, res) => {
  
    const { idate, itime, mode, location, meeting_link, aid } = req.body;
    const values = [idate, itime, mode, location, meeting_link, aid];
    await jobmod.scheduleInterview(values);
    const { name, uemail, title } = await jobmod.getCandidateDetails(aid);
    const message = `
            Hello ${name},

            Greetings from TCS!

            Congratulations on your performance in TCS. 

            Coming on the TCS 2025 Hiring Process (NQT).

            You are Eligible for TCS.

            Your interview for "${title}" has been scheduled.
            Details:
            Date: ${idate}
            Time: ${itime}
            Mode: ${mode}
            ${mode.toLowerCase() === "online" ? ` Meeting Link: ${meeting_link}` : ` Location: ${location}`}

           All the best!
            `;

  
    adminsendmail.sendMail({
      from: "dipalipatil2622001@gmail.com",
      to: uemail,
      subject: `Interview Scheduled - ${title}`,
      text: message
    }, (err, info) => {
      if (err) {
        return res.status(500).json({ msg: "Email failed", error: err.message });
      }

      res.status(201).json({
        msg: "Interview scheduled and email sent",
        email: uemail
      });
    });


};






 


