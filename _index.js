const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express()
const data = JSON.parse(fs.readFileSync('./data.json'));

// mongo db
const { MongoClient } = require('mongodb');
const connectUrl = "mongodb+srv://sky:vbHcM2rClT1crAks@cluster0.nah7cdq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectUrl);

const dbConnect = async () => {
    await client.connect();
    const db = client.db('Bucket');

    let collection = db.collection('Bucket');
    // 02345

    // await collection.insertOne({ id: 100, name: '홍홍홍' });
    // await collection.updateOne({ id: '02345' }, { $set: { name: '손하늘' } });
    await collection.deleteMany({ id: 100 });
    const data = await collection.find({}).toArray();
    console.log(data);
}

// bodyParser 사용 선언
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.get('/data', function (req, res) {
    res.send(data.data);
})

app.get('/data/:id', function (req, res) {
    const { id } = req.params;
    const findData = data.data.find(obj => obj.id == id);
    res.send(findData);
})

app.post('/data', function (req, res) {
    data.data.push(req.body);
    const body = JSON.stringify(data);
    const dataInsert = fs.writeFileSync('./data.json', body);
    res.send(data.data);
})

app.delete('/data/:id', function (req, res) {
    const { id } = req.params;
    data.data = data.data.filter(obj => obj.id != id)
    const body = JSON.stringify(data);
    fs.writeFileSync('./data.json', body);
    res.send(data.data);
})

const PORT = 3333;
app.listen(PORT, dbConnect, () => {
    console.log(`Server running... port :${PORT}`)
})
