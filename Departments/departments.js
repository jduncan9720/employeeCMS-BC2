const { createConnection } = require("net");
function viewDepts(){
    connection.query("SELECT * FROM department", function(err, res){
        if (err) throw err;
        console.log(res);
        connection.end();
    })
};