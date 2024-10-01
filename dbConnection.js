const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chamoxdev:Pohs4tZWCnRTPkFZ@sit725.xnkyh.mongodb.net/?retryWrites=true&w=majority&appName=SIT725";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;