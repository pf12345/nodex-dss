const libs = require("nodex-libs");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

let db = null;

exports.init = async function (args) {
  const { mongodb } = args;
  const { url, dbName, collectionName } = mongodb;
  MongoClient.connect(url, function (err, client) {
    if(err) {
        console.log("Connected fail to mongodb", url, err);
        return
    }
    console.log("Connected successfully to mongodb");
    db = client.db(dbName);
    console.log(`Connected successfully to db: ${dbName} and collection: ${collectionName}`);
  });
};

exports.addData = async function(body) {
    const { appid } = body;
    const collectionName = `collection${appid}`;
    if(db) {
        const collection = db.collection(collectionName);
        const result = await collection.insert(body);
        if(result && result.insertedCount > 0) {
          return exports.getDataById(result.insertedIds['0'], appid);
        }
        return false
    } else {
        throw Error('no db')
    }
}

exports.getDataById = async function(id, appid) {
  const collectionName = `collection${appid}`;
  if(db) {
      const collection = db.collection(collectionName);
      const result = await collection.find({
        _id: ObjectID(id),
      }).toArray();
      if(result && result.length) {
        return result[0];
      }
      return null
  } else {
      throw Error('no db')
  }
}

exports.updateData = async function(body) {
  const { id, appid } = body;
  const data = {
    ...body
  }
  delete data.id;
  if(db) {
    const collectionName = `collection${appid}`;
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({
      _id: ObjectID(id)
    }, { 
      $set: { 
        ...data 
      } 
    });
    console.log(result)
    return await exports.getDataById(id, appid);
  } else {
      throw Error('no db')
  }
}

exports.deleteData = async function(id, appid) {
  const collectionName = `collection${appid}`;
  if(db) {
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({
      _id: ObjectID(id)
    });
    if(result && result.deletedCount > 0) {
      return true
    } 
    return false
  } else {
    throw Error('no db')
  }
}

exports.listData = async function(appid, page, size) {
  const collectionName = `collection${appid}`;
  if(db) {
    const collection = db.collection(collectionName);
    let options = {};
    if(page && size) {
      options = {
        skip: Number(page) * size,
        limit: Number(size)
      }
    }
    const result = await collection.find({}, {
      ...options
    }).toArray();
    return result
  } else {
    throw Error('no db')
  }
}