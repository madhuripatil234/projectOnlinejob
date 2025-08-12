let db=require("../../db.js");

exports.adminData = (name,pass,role) => {
   

    return new Promise((resolve, reject) => {
        db.query("select *from admin where name=? and pass=? and role=?", [name, pass,role], (err, results) => {
                
            if (err) {
                reject("Login failed");
            } else if (results.length>0 &&results[0].role==="admin") {
                resolve("Login successfully");
            } else{
                reject("wrong choice");
            }
        });
    });
};

exports.hrData = (name,pass,role) => {
     return new Promise((resolve, reject) => {
        db.query("select *from hrlogin where hname=? and pass=? and role=?", [name, pass,role], (err, results) => {
                
            if (err) {
                reject("Login failed");
            } else if (results.length>0 &&results[0].role==="HR") {
                resolve("Login successfully");
            } else{
                reject("wrong choice");
            }
        });
    });
};

exports.userData = (name,pass,role) => {
     return new Promise((resolve, reject) => {
        db.query("select *from jobSeeker where uname=? and pass=? and role=?", [name, pass,role], (err, results) => {
                
            if (err) {
                reject("Login failed");
            } else if (results.length>0 &&results[0].role==="User") {
                resolve("Login successfully");
            } else{
                reject("wrong choice");
            }
        });
    });
};

exports.contact=(name)=>{

    return new Promise((resolve,reject)=>{

        db.query("insert into contact_us values('0',?,?,?,?,?)",[...name],(err,results)=>{
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

exports.getcontactCount = () => {
    return new Promise((resolve, reject) => {
        db.query("select count(*) as total from contact_us", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].total);
        });
    });
};

exports.getPaginatedcontact = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("select * from contact_us order by contact_id desc limit ? offset ?", [limit, offset], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};



