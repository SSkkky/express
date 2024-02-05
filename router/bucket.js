// 페이지 분리(.Router()메소드 꼭 붙어야함!)
const dataRouter = require('express').Router();
const { MongoClient } = require('mongodb');

const connectUrl = process.env.MONGO_DB;
const client = new MongoClient(connectUrl);
let collection;

const crud = async (type, info) => {
    await client.connect();
    const db = await client.db('Bucket');
    collection = await db.collection('Bucket');

    switch (type) {
        case 'post': await collection.insertOne(info); break;
        case 'put': await collection.updateOne({ id: Number(info.id) }, { $set: { id: Number(info.id), name: info.name } }); break;
        case 'delete': await collection.deleteMany({ id: Number(info) }); break;
    }
    const data = await collection.find({}).toArray(); //get
    return data;
}

dataRouter.get('/data', async function (req, res) {
    res.send(await crud('get'));
})

dataRouter.post('/data', async function (req, res) {
    res.send(await crud('post', req.body));
})

dataRouter.delete('/data/:id', async function (req, res) {
    const { id } = req.params;
    res.send(await crud('delete', id));
})

dataRouter.put('/data', async function (req, res) {
    // const { id, name } = req.body;
    console.log("put :", req.body)
    res.send(await crud('put', req.body));

    //post = put object body
    //delete = get  parameters
})

module.exports = dataRouter;