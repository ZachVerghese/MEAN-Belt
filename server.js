var express = require("express");
var path = require("path");
var app = express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var ReviewSchema = new mongoose.Schema({
    name:String,
    stars:Number,
    message:String
},
{timestamps:true}
)
var RestaurantSchema = new mongoose.Schema({
    name: String,
    cuisine:String,
    description:String,
    skills: [String],
    reviews: [ReviewSchema]},
    {timestamps:true}
);
var session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

let deleteoption= {};
// resetdelete() => {
//     req.session.deleteoption = "";
// }
// setTimeout(reset(), 30000);

mongoose.model('Restaurant', RestaurantSchema); // We are setting this Schema in our Models as 'User'
var Restaurant = mongoose.model('Restaurant');
mongoose.model('Review', ReviewSchema); // We are setting this Schema in our Models as 'User'
var Review = mongoose.model('Review');
mongoose.connect('mongodb://localhost/Restaurants');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/public/dist/public' ));

//GET get all route
app.get('/restaurantss', function(req,res){
    Restaurant.find({}, function(err,restaurants){
        if (err){
            console.log('couldnt get restaurants')
            res.json('nope')
        }
        else{
            console.log('found restaurants');
            console.log('here they are:', restaurants)
            res.json(restaurants);
        }
    })
})

app.post('/createdelete', function(req,res){
    deleteoption={info: req.body};
    req.session.deleteoption = deleteoption;
    console.log('session deleteoption', req.session.deleteoption);
})

app.get('/deletebutton', function(req,res){
    return (req.session.deleteoption);
})

//POST create new pet
app.post('/restaurants/new', function(req,res){
    Restaurant.find({name: req.body.name}, function(err,restaurants){
        if (restaurants.length >0){
            console.log('already exists w this name')
            res.json('a restaurant with this name already exists');
        }
        else{
            var restaurant = new Restaurant({name:req.body.name, cuisine:req.body.cuisine});
            restaurant.save(function(err){
                if (err){
                    console.log('couldnt create')
                    res.json('couldnt make')
                }
                else{
                    console.log('restaurant created')
                    res.json('made restaurant');
                    }
            })
        }
    })
    })

//DELETE delete pet
app.delete('/remove/:id', function(req,res){
    Restaurant.deleteOne({_id:req.params.id}, function(err,restaurant){
        if(err){
            console.log('couldnt destroy')
            res.json('not deleted');
        }
        else{
            console.log('destroyed')
            res.json('deleted')
        }
    });
});

//PUT update pet
app.put('/update/:id',function(req,res){
    console.log('hit wrong route')
    Restaurant.find({name: req.body.name}, function(err,restaurants){
         if ( restaurants.length ==1){
             if (restaurants[0].name == req.body.currname){
                 Restaurant.update({_id:req.params.id},{$set:{name:req.body.name, cuisine:req.body.cuisine}}, function(err,restaurant){
                     if (err){
                         console.log('cant update')
                         res.redirect('/')
                     }
                     else{
                         console.log('updated')
                         res.redirect('/')
                     }
                 })
             }
             else{
                 console.log('already exists w this name')
                 res.json('name already exists');
             }
         }
         else if (restaurants.length > 1){
             console.log('already exists w this name')
             res.json('name already exists');
         }
        else if (restaurants.length ==0){ 
            Restaurant.update({_id:req.params.id},{$set:{name:req.body.name, cuisine:req.body.cuisine}}, function(err,restaurant){
            if (err){
                console.log('cant update')
                res.json(' not updated')
            }
            else{
                console.log('updated')
                res.json('updated')
            }
        })
    }

        })
   
});

//GET get specific pet
app.get('/:id', function(req,res){
    console.log('hit the get route', req.params.id);
    Restaurant.find({_id:req.params.id}, function(err,restaurant){
            console.log('found this restaurant')
                res.json(restaurant)
    })
});

//PUT create like
app.put('/newReview/:restaurantid', function(req,res){
    console.log('hit put newReview route', req.params.restaurantid)
    var review = new Review({name:req.body.name, stars:req.body.stars, message:req.body.message});
    console.log('created review', review)
    review.save(function(err){
        if (err){
            console.log("problem creating review")
        }
        else{
            console.log('successfully created review');
            Restaurant.findOneAndUpdate({_id: req.params.restaurantid},{$push: {reviews:review}},function(err,data){
                if(err){
                    console.log("problem linking review to pet")
                }
                else{
                    console.log("successfully linked review to pet");
                    console.log('review', review);
                    res.json('added the review');
                };
            });
        };
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

app.listen(8000,function(){
    console.log("listening on port 8000");
})
