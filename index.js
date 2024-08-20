
const connect = require("./routes/dbconnect");
const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.set('view engine', "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    try {

        res.sendFile(__dirname + "/index.html");
    }
    catch (error) {
        console.log(error)
    }

});

app.post("/", (req, res) => {
    try {
        var email = req.body.email;
        var name = req.body.name;
        var age = req.body.age;
        console.log(email, name, age);

        connect.getConnection(function (error) {
            if (error) throw error;

            var sql = "INSERT INTO `formpr` (`email`, `name`, `age`) VALUE('" + email + "','" + name + "','" + age + "')";
            connect.query(sql, function (error, result) {
                if (error) throw error;
                // res.redirect("/user")
                res.json(result);
            });
        });

    }

    catch (error) {
        console.log(error)
    }

});

app.get("/user", (req, res) => {
    try {
        connect.getConnection(function (error) {
            if (error) throw error;

            var sql = "SELECT * FROM `formpr`";
            connect.query(sql, function (error, result) {

                if (error) console.log(error);
                // console.log(result)
                res.render(__dirname + '/user', { user: result });
                res.json(result);
            });
        });

    }
    catch (error) {
        console.log(error)
    }
});


app.get("/delete-user", (req, res) => {
    console.log('in delete user')
    try {

        connect.getConnection(function (error) {
            if (error) throw error;

            var sql = "DELETE FROM `formpr` WHERE `formpr`.`id`=?";

            var id = req.query.id

            connect.query(sql, [id], function (error, result) {
                if (error) console.log(error);
                res.redirect('/user');
            });
        });

    } catch (error) {
        console.log(error);
    }


})



app.get("/updateuser", (req, res) => {
    console.log('upadte user')
    try {

        connect.getConnection(function (error) {
            if (error) throw error;

            var sql = "SELECT * FROM `formpr` WHERE id=?";

            var id = req.query.id

            connect.query(sql, [id], function (error, result) {
                if (error) console.log(error);
                res.render(__dirname + "/updateuser", { user: result })

            });
        });

    } catch (error) {
        console.log(error);
    }

})

// app.post("/updateuser",(req,res)=>{

//     var userid =req.query.id
//     var useremail=req.body.email
//     var username=req.body.name
//     var userage=req.body.age 


//     connect.getConnection(function(error){
//         if(error) throw error

//         var sql = "UPDATE formpr SET name=?, email=?, age=? WHERE id=?";

//         connect.query(sql,[userid ,useremail,username,userage],function(error,result){
//             console.log(result)
//             if(error) console.log(error)
//                 res.redirect("/user")
//         })  

//     })

// } )




app.post("/updateuser", (req, res) => {
    var userid = req.query.id; // This should be req.body.id if you are sending id via POST
    var useremail = req.body.email;
    var username = req.body.name;
    var userage = req.body.age;

    connect.getConnection(function (error) {
        if (error) throw error;

        var sql = `UPDATE formpr SET name='${username}', email='${useremail}', age='${userage}' WHERE id=${userid}`;
        console.log(sql);
        connect.query(sql, [username, useremail, userage, userid], function (error, result) {
            if (error) {
                console.log(error);
                res.json(error);
            } else {
                console.log(result);
                // res.redirect("/user");
                    res.json(result)
            }
        });
    });
});


app.get("/datacheck", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})
            


app.listen(4000)
console.log("server is runing ")


