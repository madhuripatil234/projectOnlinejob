let db=require("../../db.js");

exports.adminData = (aname,pass,role) => {
   

    return new Promise((resolve, reject) => {
        db.query("select *from admin where aname=? and pass=? and role=?", [aname, pass,role], (err, results) => {
                
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

exports.hrData = (hname,pass,role) => {
     return new Promise((resolve, reject) => {
        db.query("select *from hrlogin where hname=? and pass=? and role=?", [hname, pass,role], (err, results) => {
                
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

exports.userData = (uname,pass,role) => {
     return new Promise((resolve, reject) => {
        db.query("select *from jobSeeker where uname=? and pass=? and role=?", [uname, pass,role], (err, results) => {
                
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

