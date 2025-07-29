require("dotenv").config();
let mysql=require("mysql2");
let conn =mysql.createConnection({
    host:process.env.db_host,
    user:process.env.db_username,
    password:process.env.db_password,
    database:process.env.db_name
});
conn.connect((err)=>{
    if(err)
    {
        console.log("database not connect");
    }
    else    
    {
        console.log("database is connect");

    }

});
module.exports=conn;