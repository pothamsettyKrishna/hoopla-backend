const express = require( "express" );
const userRoute = express.Router();
const userServ = require('../service/user');
const db = require('../model/dbsetup');

userRoute.get( "/userDBsetup", ( req, res, next ) => {
    db.usersetupDB().then( response => {
        if( response ) res.json( { message: "Successfully inserted user documents into database" } )
    } ).catch( error => {
        next( error );
    } )
} )

userRoute.post( '/login', ( req, res, next ) => {
    var username = req.body.userName;
    var password = req.body.password;
    console.log(username,password);
    
    return userServ.loginUser( username, password ).then( userData => {
        res.json( userData );        
    } ).catch( err => {
        
        next( err );
    } );
} );

userRoute.put('/register',(req,res,next)=>{
    var rdetails=req.body;
    return userServ.registerUser(rdetails).then(data=>{
        res.json(data);
    }).catch(err=>{
        next(err);
    })
})

userRoute.put('/update/:username',(req,res,next)=>{
    var username = req.params.username;
    var order = req.body;   
    return userServ.pushOrders(username,order).then(data =>{
        res.json(data);
        console.log(data);
        
    }).catch( err => {
        
        next( err );
    } );

})

userRoute.get('/getorders/:username',(req,res,next)=>{
    var username = req.params.username;
    return userServ.getOrders(username).then(data =>{
        res.json(data);
        console.log("get-->",data);        
    }).catch( err => {        
        next( err );
    } );
})

module.exports = userRoute