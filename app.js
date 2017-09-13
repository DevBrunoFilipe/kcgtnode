var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

//Handles routing
app.get('/', function(req, res){
    //res.send('Main content.');
    res.render('index', {
        nav   : ['recruitment', 'resources', 'contact']
    });
});

app.get('/register', function(req, res){
    res.send("This website is currently under developemnt, as such, registrations are not yet available. Please return at a later date for our fully functioning website. We're sorry for the inconvenience and thank you for your patience.");
    // res.render('index', {
    //     nav   : ['recruitment', 'resources', 'contact']
    // });
});

app.listen(port, function(err){
    console.log('The server is running on port: ' + port);
})