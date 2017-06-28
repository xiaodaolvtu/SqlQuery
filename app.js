var restify = require('restify');
var mysql = require('mysql');

var conn = mysql.createConnection({host: '172.16.1.81',user: 'root',password: '123456', database:'jgy',port: 3306});
var server = restify.createServer({
   
   name: 'sql query',
  version: '1.0.0'
});

server.get('/query', function(req, res){
        const sql = unescape(req.url.replace('/query?sql=','')).replace(/\'/g,'').replace(/\"/g,'');
        conn.query( { 
            sql:  sql,
            values: []
        },
        (err, rows, fields)=>{ 
        if (err) res.send(200, res.json(err));
        else res.send(200, res.json(rows));
        });
    });

server.listen(8082, function() {
  console.log('listening at 8082 ');
});
// http://10.0.2.123:8082/query?sql='select ParamStr from message_short order by id desc'