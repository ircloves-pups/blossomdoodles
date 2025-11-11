/*
Run this locally to seed your MongoDB 'doodles' database with sample data.
Usage: MONGODB_URI="youruri" node scripts/seed.js
*/
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'

const uri = process.env.MONGODB_URI
if(!uri){ console.error('Set MONGODB_URI env var'); process.exit(1) }

const client = new MongoClient(uri)
async function run(){
  try{
    await client.connect()
    const db = client.db('doodles')
    const col = db.collection('Puppy')
    const file = path.join(process.cwd(),'seed','puppies.json')
    const text = fs.readFileSync(file,'utf8')
    const docs = JSON.parse(text)
    for(const d of docs){
      await col.updateOne({_id: d._id}, {$set: d}, {upsert:true})
      console.log('Upserted', d._id)
    }
    console.log('Done')
  }catch(err){ console.error(err) }
  finally{ await client.close() }
}
run()
