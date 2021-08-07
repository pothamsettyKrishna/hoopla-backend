const collection = require( '../utilites/connection' );

let user = {}



user.userLogin = ( username, password ) => {
    return collection.getUserCollection().then( usercol => {
        return usercol.findOne( { "userdetails.userName": username } ).then( data => {
            if( data ) {
                if( password == data['userdetails']['password'] ) {
                    return data
                    
                } else{
                    throw new Error( "The password entered is incorrect!!" )
                }
            } else{
                throw new Error( "You are not registered.Please register to login" );
            }
        } )
    } )

}

user.pushOrders = (userName,orderobj)=>{
    console.log(orderobj); 
    return collection.getUserCollection().then(usercol =>{
        return usercol.findOne({"userdetails.userName":userName}).then(user =>{
            return usercol.updateOne( { "userdetails.userName": userName },
                                {$push: {order: orderobj} } ).then( updatedData => {
                                    if( updatedData.nModified == 1 ) {
                                        return user['order']
                                    } else{
                                        throw new Error( "Unable to add product" )
                                    }
                                } )
        })
    })
}

user.register = (userobj) =>{
    return collection.getUserCollection().then( usercoll =>{
        return usercoll.create({userobj}).then(data =>{
                console.log("usercollec",usercoll)
                console.log("new user", data)
                if(data.nInserted != 0){
                    return data;
                }else{
                    throw new Error(" unable to register ")
                }
            })
        })
    }


user.getOrders = (username)=>{
    return collection.getUserCollection().then(usercol =>{
        return usercol.findOne({"userdetails.userName":username},{_id:0,order:1}).then(orders =>{
            if(orders){
                return orders.order
            }
            else{
                let err=new Error( "Error in getting orders" )
                err.status=404
                throw err
            }
        })
    })
}



module.exports = user