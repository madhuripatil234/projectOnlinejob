let db=require("../../db.js");
exports.savejobData=(name)=>{

    return new Promise((resolve,reject)=>{

        db.query("insert into jobs values('0',?,?,?,?,?,?,?)",[...name],(err,results)=>{
            if(err)
            {
                reject("job not save "+err.message);
            }
            else{
                resolve("job save successfull..");
            }

        });
    });
}
exports.getjobCount = () => {
    return new Promise((resolve, reject) => {
        db.query("select count(*) as total from jobs", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].total);
        });
    });
};

exports.getPaginatedjob = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("select * from jobs order by jid desc limit ? offset ?", [limit, offset], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};


exports.deletejobById=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from jobs where jid=?",[id],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })

}

exports.finalUpdatejob = (jid,company_name, title, description, location, salary, job_type) => {
    return new Promise((resolve, reject) => {
        db.query(
            "update jobs set company_name=?, title=?, description=?, location=?, salary=?, job_type=? WHERE jid=?",
            [company_name, title, description, location, salary, job_type, jid],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("success");
                }
            }
        );
    });
};

exports.getBytitleanddate=(name,date)=>{
    return new Promise((resolve,reject)=>{
         db.query("select *from jobs where title like '%" + name + "%' and posted_date_time like '%"+date+"%'", (err, result) => {

            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })

}
