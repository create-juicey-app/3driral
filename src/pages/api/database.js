const { MongoClient } = require("mongodb");

// Replace the URI with your MongoDB connection string
const uri =
  "mongodb+srv://enzoignaes:123Iloveoranges321@jdata.qvwjzzq.mongodb.net/?retryWrites=true&w=majority&appName=Jdata";

let client;
let db;

const connectToDatabase = async () => {
  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db("Jdata");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

const getDatabase = () => {
  return db;
};

const closeConnection = async () => {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connectToDatabase, getDatabase, closeConnection };
