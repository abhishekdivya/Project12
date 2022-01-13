const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;
const mongoose = require("mongoose") ;

const app = express() ;
app.set("view engine" , "ejs") ;

app.use(bodyParser.urlencoded({extended : true})) ;

app.use(express.static("public")) ;





mongoose.connect("mongodb://localhost:27017/Project12" ,{useNewUrlParser : true}) ;

const productSchema ={
  ProductName : String ,
  Category : String ,
  Description : String ,
  Price : Number
} ;

const carSchema = {
  carName : String ,
  Model : String
} ;


const Product = mongoose.model("Product" , productSchema) ;
const Car = mongoose.model ("Car" , carSchema) ;

app.route("/products")

.get(function(req ,res){
  Product.find(function(err , foundProducts){
    if(!err) {
      res.send(foundProducts)
    } else {
      res.send(err)
    }
    console.log(foundProducts);

  }) ;
})

.post(function(req ,res) {


 const newProduct = new Product({
   ProductName : req.body.ProductName ,
   Category : req.body.Category ,
   Description : req.body.Description ,
   Price : req.body.Price
}) ;

newProduct.save(function(err){
  if (!err){
    res.send("Successfully added a new Product") ;
  } else {
    res.send(err) ;
  }
}) ;

})


.delete(function(req , res){
  Product.deleteMany(function(err){
    if(err){
      res.send("Successfully delete all products")
    } else {
      res.send(err) ;
    }
  }) ;
}) ;


//////request targeting specific route////

app.route("/products/:ProductName")

.get(function(req, res){
  Product.findOne( {ProductName: req.params.ProductName},
     function(err , foundProduct){
    if(foundProduct){
      res.send(foundProduct);
    } else{
      res.send("No product matching") ;
    }
  }) ;
})

.put(function(req, res){
  Product.updateOne(
    {ProductName : req.params.ProductName} ,
    {ProductName : req.body.ProductName , Category : req.body.Category ,Description : req.body.Description ,
    Price : req.body.Price } ,
    // {overwrite : true} ,
    function(err){
      if(!err){
        res.send("Successfully updated product")
      } else{
        console.log(err);
        res.send(err)
      }
    }
  ) ;
})


. delete(function(req, res){
  Product.deleteOne(
    {ProductName : req.params.ProductName} ,
    function(err) {
      if(!err) {
        res.send("Successfully deleted product")
      }else {
        res.send(err)
      }
    }
  ) ;
}) ;







app.listen(3000 , function(){
  console.log("Server Started on port 3000");
}) ;
