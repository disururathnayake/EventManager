const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://disuruoffice:F6zbmqUnIwaJVofs@cluster0.sccq5gf.mongodb.net/";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;