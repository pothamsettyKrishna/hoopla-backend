const collection = require( '../utilites/connection' );


let product = {}

product.getProducts = (category) =>{
    return collection.getProductCollection().then( prod=>{
        return prod.find( {"pCategory": category} ).then( data=>{
            if( data.length>0 ){
                return data
            } else{
                return null
            }
        } )
    } )
}

product.search=( searchitem )=>{
    return collection.getProductCollection().then( prod=>{
        return prod.find( {}, {_id: 0} ).then( searchedData=>{
           var prodArr=[] //
           const pattern=new RegExp( searchitem.toUpperCase() )
            searchedData.filter( prodObj=>{
                if( pattern.test( prodObj.pCategory.toUpperCase() )){
                    prodArr.push( prodObj )
                } else if( pattern.test( prodObj.pName.toUpperCase() )){                   
                    prodArr.push( prodObj )
                } else if(pattern.test( prodObj.pDescription.toUpperCase() )){
                    prodArr.push( prodObj )
                }
            } )
            if( prodArr.length>0 ){
                return prodArr
            } else
            {
                throw new Error( "No data found for the searched item" )
            }
        } )
    } )
}

product.getAllprod=()=>{
    return collection.getProductCollection().then( prod=>{
        return prod.find({},{_id:0}).then( data=>{
            if( data.length>0 ){
                return data
            } else{
                return null
            }
        } )
    } )
}

product.updateQty=(order)=>{
    return collection.getProductCollection().then(prod=>{
        return prod.updateOne( {pName: order.pname}, {$inc: {"pSeller.pQuantity": -1}} )
                .then( updatedData=>{
                    if( updatedData.nModified==1 ){                       
                        return updatedData
                    } else{
                        throw new Error( "Unable to update the quantity of product")
                    }
                } )
    })
}

module.exports = product