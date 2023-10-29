import * as AWS from 'aws-sdk'
import Estoque from '../cliente/src/components/pages/Estoque.jsx'

const client = new AWS.DynamoDB({
    region: 'us-east-1',
    secretAccessKey: 'OB/FrvKNiAnOKkuf0WyVuppXmL+r1/XAxClQXpei',
    accessKeyId: 'AKIAVJRGXD2KGXYGAJN5'
})

const fetchData = () => {
    var params = {
        TableName: "Stock"
    }

    client.scan(params, (err, data) => {
        if (!err) {
            console.log(data);
            <Estoque AWSDB={data} />
        }
        else console.log(err)
    })
}

export default fetchData
