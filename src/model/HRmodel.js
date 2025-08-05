let db=require("../../db.js");

exports.saveHRData=(name)=>{

    return new Promise((resolve,reject)=>{

        db.query("insert into hrlogin values('0',?,?,?,?,?,?,?)",[...name],(err,results)=>{
            if(err)
            {
                reject("HR not save "+err.message);
            }
            else{
                resolve("HR save successfull..");
            }

        });
    });
}

exports.getHRCount = () => {
    return new Promise((resolve, reject) => {
        db.query("select count(*) as total from hrlogin", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].total);
        });
    });
};

exports.getPaginatedHR = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("select * from hrlogin order by hid desc limit ? offset ?", [limit, offset], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};


exports.deleteHrById=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from hrlogin where hid=?",[id],(err,result)=>{
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

exports.finalUpdate = (hid,hname, pass, email, contact_number, company_name, experience, role) => {
    return new Promise((resolve, reject) => {
        db.query(
            "update hrlogin set hname=?, pass=?, email=?, contact_number=?, company_name=?, experience=?, role=? WHERE hid=?",
            [hname, pass, email, contact_number, company_name, experience, role, hid],
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

exports.getByName=(name)=>{
    return new Promise((resolve,reject)=>{
     db.query("select *from hrlogin where hname like '%" + name + "%'", (err, result) => {
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

exports.interviewData=(name)=>{

    return new Promise((resolve,reject)=>{

        db.query("insert into interviews values('0',?,?,?,?,?,?)",[...name],(err,results)=>{
            if(err)
            {
                reject("not submit "+err.message);
            }
            else{
                resolve("submit successfull..");
            }

        });
    });
}





