var mysql = require('mysql');


var db = {
    connectTo: () => {
        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "root",
            database: "chat"
        });
        return con;
    },
    add: (con, data, res, table_name) => {
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected")
            var sql = `INSERT INTO ${table_name} (userid,content,recid) VALUES (${data.from},'${data.msg}',${data.to})`;
            con.query(sql, function (err) {
                if (err) throw err;
                console.log("inserted")
                res.send(data)

            });
        });


    },
    get: (con, data, res, table_name) => {
        var main = []
        var names=[]
        con.connect(function (err) {
            if (err) throw err;

            con.query(`SELECT userid, content, recid FROM ${table_name} WHERE (userid=${data.from} AND recid=${data.to}) OR (userid=${data.to} AND recid=${data.from})`, function (err, result, fields) {
                if (err) throw err;
                main = result;

                con.query(`SELECT name FROM users WHERE userid=${data.from}`, function (err, result, fields) {
                    if (err) throw err;
                           names.push(result[0].name)
                                   
                    con.query(`SELECT name FROM users WHERE userid=${data.to}`, function (err, result, fields) {
                        if (err) throw err;
                        names.push(result[0].name)
                        console.log(names)

                        for (var i = 0; i < main.length; i++) {
                            if (main[i].userid == data.from) {
                                main[i].sender = names[0];
                                main[i].recid = names[1];

                            }else{
                                main[i].recid = names[0];
                                main[i].sender = names[1];

                            }
                        }
                        console.log(main);

                        res.json(main)
                        con.end();
    
                    });

                });
      
            });
        });



    }


}
// var sql = ` SELECT messages.userid, messages.content, messages.recid, users.name
// FROM messages
// INNER JOIN users ON messages.userid=users.userid `
// con.query(sql, function (err, result, fields) {
//    if (err) throw err;
//   res.json(result)

// });

module.exports = db;