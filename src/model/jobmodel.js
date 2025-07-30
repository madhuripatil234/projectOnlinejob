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
