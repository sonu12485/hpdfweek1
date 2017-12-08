var express = require('express');
var morgan = require('morgan');
var path = require('path');

var request = require('request');

var session = require('express-session');

var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));

app.use(session({
  secret : 'randomvalue',
  cookie : { maxAge:1000*60*60*24*10 }
}));

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send("Hello World - \nSai");
});

app.get('/authors',function(req,res){

  var c=0;
  var dispdata = "";
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var authorinfo = JSON.parse(body);

      request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var postinfo = JSON.parse(body);

          for(var i=0;i<authorinfo.length;i++)
          {
            dispdata += authorinfo[i].name.toString() + '&nbsp;&nbsp;&nbsp;&nbsp;';
            c=0;
            for(var j=0;j<postinfo.length;j++)
            {
              if(authorinfo[i].id === postinfo[j].userId)
              {
                c++;
              }
            }
            dispdata += c.toString() + '<br>';
          }
          res.set('Content-Type', 'text/html');
          res.send(dispdata);
        }
      });

    }
  });

});

app.get('/setcookie',function(req,res){

  if(req.session && req.session.auth && req.session.auth.name && req.session.auth.age)
  {
    res.send("cookie already has been set");
  }
  else
  {
    req.session.auth = {name : "sonu" , age : "19"};
    res.send("cookie has been set as name = sonu and age = 19");
  }

});

app.get('/getcookie',function(req,res){
  var name = req.session.auth.name.toString();
  var age = req.session.auth.age.toString();
  var disp = "Name- " + name + "<br>" + "Age-" + age;
  res.send(disp);
});

app.get('/robots.txt',function(req,res){
  res.send("PERMISSION TO THIS PAGE IS DENIED");
});

app.get('/html',function(req,res){
  res.sendFile(path.join(__dirname,'welcome.html'));
});

app.get('/image',function(req,res){
  res.sendFile(path.join(__dirname,'Hasura_Image.webp'));
});

app.get('/input',function(req,res){
  res.sendFile(path.join(__dirname,'inputs.html'));
});

app.get('/inputjs',function(req,res){
  res.sendFile(path.join(__dirname,'inputs.js'));
});

app.post('/logs',function(req,res){
  var data = req.body.data.toString();
  console.log(data);
  res.status(200).send(data);
});

var port = 8080;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
});
