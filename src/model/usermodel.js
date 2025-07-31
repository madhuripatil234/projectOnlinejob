let db=require("../../db.js");

exports.registationuser=(name)=>{

    return new Promise((resolve,reject)=>{

        db.query("insert into jobseeker values('0',?,?,?,?,?,?,?,?,?)",[...name],(err,results)=>{
            if(err)
            {
                reject("Registation not successfully... "+err.message);
            }
            else{
                resolve("Registation successfull..");
            }

        });
    });
}
exports.applyforjob=(name)=>{

    return new Promise((resolve,reject)=>{

        db.query("insert into applications values('0',?,?)",[...name],(err,results)=>{
            if(err)
            {
                reject("Apply not successfully... "+err.message);
            }
            else{
                resolve("Apply successfull..");
            }

        });
    });
}

exports.viewapplyCount = () => {
    return new Promise((resolve, reject) => {
        db.query("select count(*) as total from applications", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].total);
        });
    });
};

exports.getPaginatedviewapply = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT a.aid, u.uname AS applicant_name, u.uemail, j.title AS job_title, j.company_name, a.applied_on FROM applications a join jobseeker u on a.uid = u.uid join jobs j ON a.jid  = j.jid  order by a.aid DESC LIMIT ? OFFSET ?",
[limit, offset], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};
