const libs = require("nodex-libs");
const MongoClient = require("mongodb").MongoClient;

let args = null;
let db = null;

exports.init = async function (args) {
  args = args;
  const { mongodb } = args;
  const { url, dbName } = mongodb;
  MongoClient.connect(url, function (err, client) {
    if(err) {
        console.log("Connected fail to mongodb", url, err);
        return
    }
    console.log("Connected successfully to mongodb");
    console.log('dbName: ', dbName)

    db = client.db(dbName);
    console.log(db)
  });
};

exports.addData = async function(body) {
    console.log(db);
    if(db) {
        const collection = db.collection('oss');
        const result = await collection.insert(body);
        return result
    } else {
        return 'no db';
    }
}