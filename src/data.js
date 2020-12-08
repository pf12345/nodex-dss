const libs = require("nodex-libs");
const { MongoClient, ObjectID } = require("mongodb");

let db = null;

exports.init = async function (args) {
  const { mongodb } = args;
  const { url, dbName } = mongodb;
  MongoClient.connect(url, function (err, client) {
    if (err) {
      throw libs.error("ERR_DSS_CONNECTION", err.message);
    }
    db = client.db(dbName);
    if(!db) {
      throw libs.error("ERR_DSS_NO_DB", "no db");
    }
  });
};

exports.add = async function ({ appid, ...ret }) {
  const collectionName = `collection${appid}`;
  const collection = db.collection(collectionName);
  const result = await collection.insert({ appid, ...ret });
  if (!result || result.insertedCount <= 0) {
    return false;
  }
  return result.insertedIds['0'];
}

exports.get = async function (id, appid) {
  const collectionName = `collection${appid}`;
  const collection = db.collection(collectionName);
  const result = await collection.find({
    _id: ObjectID(id),
  }).toArray();
  if (!result || !result.length) {
    throw libs.error("ERR_DSS_NO_DATA", "无相关数据")
  }
  return result[0];
}

exports.set = async function ({ id, appid, ...ret }) {
  const collectionName = `collection${appid}`;
  const collection = db.collection(collectionName);
  const result = await collection.updateOne({
    _id: ObjectID(id)
  }, {
    $set: { appid, ...ret }
  });
  return !!(result && result.matchedCount);

}

exports.del = async function (appid, query) {
  const collectionName = `collection${appid}`;
  const collection = db.collection(collectionName);
  let filter = {};
  if(typeof query === 'string') {
    filter = { _id : ObjectID(query) };
  } else {
    filter = query || {}
  }
  const result = await collection.deleteOne(filter);
  return !!(result && result.deletedCount > 0)
}

exports.list = async function (appid, page, size, query = {}) {
  const collectionName = `collection${appid}`;
  const collection = db.collection(collectionName);
  let options = {};
  if (page && size) {
    options = {
      skip: Number(page) * size,
      limit: Number(size)
    }
  }
  return await collection.find(query, {
    ...options
  }).toArray();
}