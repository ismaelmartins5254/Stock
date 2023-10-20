import * as AWS from 'aws-sdk'

const client = new AWS.DynamoDB.DocumentClient()

export const fetchData = (STOCK) =>{
    var params = {
        STOCK: STOCK
    }

    client.scan(params, (err,data)=>{
        if(!err){
            console.log(data)
        }
        else console.log(err)
    })
}