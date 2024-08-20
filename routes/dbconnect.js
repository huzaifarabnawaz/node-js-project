var mysql=require("mysql")

var connect=mysql.createPool({

    host:"localhost",
    user:"root",
    password:"",
    database:"databasepr"

})

module.exports=connect