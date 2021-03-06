const userDb = require( '../model/user' );
let user = {}

user.setupDB = () => {
    return userDb.setupDB().then( response => {  
     if( response ){
         return response;
        } else{
            let err = new Error( 'Insertion Failed' );
            err.status = 500;
           throw err;
        } 
    } );
 }
user.loginUser = ( username, password ) => {
    
    return userDb.userLogin( username, password ).then( response => {
        return response
    } )
}

user.registerUser=(rdetails)=>{
    return userDb.register(rdetails).then(data=>{
        if(data){
            return data;
        } else{
            return null
        }
    })
}


user.pushOrders = (username, order) => {
    return userDb.pushOrders(username,order).then(data=>{
        if(data){
            return data
        }
        else{
            return null
        }
    })
}

user.getOrders = (username) => {
    return userDb.getOrders(username).then(data =>{
        if(data){
            return data
        } 
    })
}

module.exports=user

