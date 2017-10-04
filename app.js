var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', {
    useMongoClient: true
});
//mongoose.connect('localhost:27017/kcgt');
require ('./src/models/characters')

var port = process.env.PORT || 3000;
var authRouter = require('./src/routes/authRoutes');
var forumRouter = require('./src/routes/forumRoutes');
var userRouter = require('./src/routes/userRoutes');
var testsRouter = require('./src/routes/testsRoutes');
var charactersRouter = require('./src/routes/charactersRoutes');

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use(function(req, res, next){
    res.locals.paths = [
        {Link: '../', Text: 'return'},
        {Link: '../', Text: 'logout'}
    ];
    next();
});

//Handles routing
app.get('/', function(req, res){
    //res.send('Main content.');
    res.render('index', {
        nav: [
            {Link: '#recruitment', Text: 'recruitment'},
            {Link: '#resources', Text: 'resources'},
            {Link: '#contacts', Text: 'contacts'},
            {Link: '/auth', Text: 'login'}
        ]
    });
});


//test running only
app.use('/tests', testsRouter);
//end test

//user related
    app.use('/auth', authRouter);
//end user

//forum related
    app.use('/forum', forumRouter);
    app.use('/forum/threads', forumRouter);
//end forum

//user related
    app.use('/dashboard', userRouter);
//end user

//characters related
    app.use('/dashboard/characters', charactersRouter);
//end characters

app.listen(port, function(err){
    console.log('The server is running on port: ' + port);
})