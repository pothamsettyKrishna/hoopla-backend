const{ Schema } = require( 'mongoose' );
const mongoose = require( 'mongoose' );
mongoose.set('useCreateIndex',true)
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/HooplaDbs"


const usersSchema = Schema( 
    {
    
    userdetails: {
        userName: {type:String},
        password: String,
        name:String
    },
    order: Array

}, {collection: "Users", timestamps: true } )

const ProductSchema=Schema( {
    _id: String,
    pName: String,
    pDescription: String,
    pRating: Number,
    pCategory: String,
    price: Number,
    color: String,
    image: String,
    specification: String,
    dateFirstAvailable: {
        date: {
            type: Date, 
            default: new Date().toISOString()
        }
    },
    dateLastAvailable: {
        date: {
            type: Date, 
            default: new Date().toISOString()
        }
    },
    pSeller: {
        s_Id: String,
        pDiscount: Number,
        pQuantity: Number,
        pShippingCharges: Number
    },
    
}, {collection: "Products" } )

let collection = {}
collection.getUserCollection = () => {
    //establish connection and return model as promise
    return mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ).then( database => {
        return database.model( 'Users', usersSchema )
    } ).catch( error => {
        if(error){ //
        let err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;}
    } );
}
collection.getProductCollection = () =>{
    return mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ).then( database=>{
        return database.model('Product',ProductSchema)
    }).catch(error =>{
        if(error){
            let err = new Error("Could not connect to the database");
            err.status = 500;
            throw err;
        }
    })
}

module.exports = collection;