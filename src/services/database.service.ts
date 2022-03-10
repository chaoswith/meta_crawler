import * as mongoDB from 'mongodb';

const MONGODB_URL = process.env.MONGODB_URL ?? '';
const MONGODB_NAME = process.env.MONGODB_NAME ?? '';
const MONGODB_COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME ?? '';

export const collections: { metadatas?: mongoDB.Collection } = {};

export function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(MONGODB_URL!);
  client.connect();
  const db: mongoDB.Db = client.db(MONGODB_NAME!);
  const metadatasCollection: mongoDB.Collection = db.collection(MONGODB_COLLECTION_NAME!);
  collections.metadatas = metadatasCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${metadatasCollection.collectionName}`);
}
export default collections;
