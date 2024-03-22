const { MongoClient } = require("mongodb");

// ... (Rest of your existing code from previous response)

const handler = async (req, res) => {
  // Connect to the database
  await connectToDatabase();

  // Get a reference to the "models" collection
  const modelsCollection = db.collection("models");

  // Sample query to retrieve a single document (replace with your query logic)
  const query = {
    /* your query filter here */
  };
  const options = {
    projection: {
      /* specify fields to return (optional) */
    },
  };

  try {
    // Find a document in the "models" collection based on the query
    const modelData = await modelsCollection.findOne(query, options);

    // Send the retrieved data as JSON response
    res.status(200).json(modelData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving data" });
  } finally {
    // Close the database connection (optional if connection pooling is used)
    await closeConnection();
  }
};

export default handler;
