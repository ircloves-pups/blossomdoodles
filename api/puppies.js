import { connectToDatabase } from './_db.js'; // Update path if necessary

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to the 'doodles' database, collection 'Puppy'
    const { db } = await connectToDatabase(process.env.MONGODB_URI, 'doodles');

    // Fetch puppies where status is "available"
    const puppies = await db.collection('Puppy').find({ status: "available" }).toArray();

    // Return as JSON
    return res.status(200).json(puppies);
  } catch (err) {
    console.error('Error fetching puppies:', err);
    return res.status(500).json({ error: 'Failed to fetch puppies' });
  }
}

