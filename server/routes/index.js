var express = require('express'); //bringing in Express

var router = express.Router();    //brining in Router

var path = require('path');

var mongoose = require('mongoose');  //Our first line of course is us declaring the use of Mongoose under the variable mongoose

mongoose.connect('mongodb://localhost/basic_walking_skeleton');  //connect to a database

var Cat = mongoose.model('Cat', {name:String});

router.post('/add', function(request, response, next){
    var kitty = new Cat({name: request.body.name});
    kitty.save(function(err){
        if(err) console.log('meow %s', err);
        response.send(kitty.toJSON());
        next();
    });
});

router.get('/cats', function(request, response, next){
    return Cat.find({}).exec(function(err, cats){
        if(err) throw new Error(err);
        response.send(JSON.stringify(cats));
        next();
    });
});



router.get('/', function(req, res, next) {   //instead of calling the ‘get’ method on ‘app’, we are calling it on the ‘router’
    console.log('Here is a console log');     //So we set up the get method on the router object with a few more intricacies.

    //var file = req.params[0] || 'views/index.html';          //first is that we are declaring file and making sure we are either setting it equal to some possible parameters coming in on the request OR, if they are not there, we are setting it equal to our index view

    //res.sendFile(path.join(__dirname, '../public', file));    //Then we are setting up our response to ensure it has the proper path to the needed file using sendFile with some path magic at the helm

    res.sendFile(path.join(__dirname, '../public/views/index.html'));

    next();                            //called ‘next’, which has to do with how express handles middleware
});

module.exports = router;               //As a final command, we issue an export order to the router to be a module. This makes it available to us throughout the rest of the application
