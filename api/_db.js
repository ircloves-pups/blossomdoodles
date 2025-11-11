import { MongoClient } from 'mongodb'

let cachedClient = null
let cachedDb = null

export async function connectToDatabase(uri, dbName='doodles') {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb }
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  cachedClient = client
  cachedDb = db
  return { client, db }
}
