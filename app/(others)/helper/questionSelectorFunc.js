const { MongoClient, ObjectId } = require("mongodb");

console.log('hello')
/**
 * Fetches random questions from MongoDB based on topic and quantity
 * @param {Array} inputArray - Array of objects with {topic, no_of_questions}
 * @param {Object} options - Database connection options
 * @returns {Array} Array of objects with {topic, questions, answers}
 */


async function fetchRandomQuestions(inputArray, options = {}) {
  const {
    uri = "mongodb://localhost:27017",
    dbName = "lara-lms",
    collectionName = "questions"
  } = options;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const output = [];

    for (const entry of inputArray) {
      const { topic, no_of_questions } = entry;

      // Validate input
      if (!topic || !no_of_questions || no_of_questions <= 0 || no_of_questions > 25) {
        console.warn(`Invalid entry skipped: ${JSON.stringify(entry)}`);
        continue;
      }

      try {
        // Use MongoDB aggregation for efficient random sampling
        const questions = await collection.aggregate([
          { $match: { topic: topic } },
          { $sample: { size: no_of_questions } }
        ]).toArray();

        // Extract question IDs and answers
        const questionIds = questions.map(q => q._id);
        const answers = questions.map(q => q.answer);

        output.push({
          topic: topic,
          questions: questionIds,
          answers: answers
        });

      } catch (topicError) {
        console.error(`Error processing topic "${topic}":`, topicError);
        // Add empty result for failed topic
        output.push({
          topic: topic,
          questions: [],
          answers: []
        });
      }
    }

    return output;

  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error(`Failed to fetch questions: ${err.message}`);
  } finally {
    await client.close();
  }
}

// Example usage
async function example() {
  const inputArray = [
    { "topic": "old", "no_of_questions": 5 },
    { "topic": "new", "no_of_questions": 5 },
    { "topic": "modern", "no_of_questions": 10 }
  ];

  try {
    const result = await fetchRandomQuestions(inputArray, {
      uri: "mongodb://localhost:27017",
      dbName: "quiz_database",
      collectionName: "questions"
    });

    console.log("Output:", JSON.stringify(result, null, 2));
    
    // Expected output format:
    // [
    //   {
    //     "topic": "series",
    //     "questions": [ObjectId("..."), ObjectId("..."), ...],
    //     "answers": ["7", "10", "15", ...]
    //   },
    //   {
    //     "topic": "math", 
    //     "questions": [ObjectId("..."), ObjectId("..."), ...],
    //     "answers": ["42", "100", "25", ...]
    //   }
    // ]

  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Optimized version with connection pooling for multiple calls
class QuestionService {
  constructor(uri = "mongodb://localhost:27017", dbName = "lara-lms") {
    this.uri = uri;
    this.dbName = dbName;
    this.client = null;
  }

  async connect() {
    if (!this.client) {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection("questions");
  }

  async fetchRandomQuestions(inputArray) {
    const collection = await this.connect();
    const output = [];

    for (const entry of inputArray) {
      const { topic, no_of_questions } = entry;

      if (!topic || !no_of_questions || no_of_questions <= 0 || no_of_questions > 25) {
        continue;
      }

      try {
        const questions = await collection.aggregate([
          { $match: { topic: topic } },
          { $sample: { size: no_of_questions } }
        ]).toArray();

        output.push({
          topic: topic,
          questions: questions.map(q => q._id),
          answers: questions.map(q => q.answer)
        });

      } catch (error) {
        console.error(`Error for topic ${topic}:`, error);
        output.push({
          topic: topic,
          questions: [],
          answers: []
        });
      }
    }

    return output;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }
}

// Test function to verify the schema
async function testWithSampleData() {
  const inputArray = [
    { "topic": "old", "no_of_questions": 5 },
    { "topic": "new", "no_of_questions": 5 }
  ];

  // This would work with your sample document:
  // {
  //   "_id": ObjectId("..."),
  //   "question": "what comes next 1, 2, 3, 4, 5, 6 ?",
  //   "options": ["7", "10", "9", "11"],
  //   "answer": "7",
  //   "topic": "series"
  // }

  const service = new QuestionService("mongodb://localhost:27017", "lara-lms");
  
  try {
    const result = await service.fetchRandomQuestions(inputArray);
    console.log("Test result:", result);
  } finally {
    await service.close();
  }
}

testWithSampleData();

//module.exports = { fetchRandomQuestions, QuestionService };