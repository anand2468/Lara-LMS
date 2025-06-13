//const { MongoClient, ObjectId } = require("mongodb");
import  {MongoClient, ObjectId} from 'mongodb';
import { generateQuestionsRequest, generateQuestionsResponse } from '../types/testRequest';

// Optimized version with connection pooling for multiple calls
export class MongoService {
    uri:string
    dbName:string
    client?:MongoClient
    collectionName:string
  constructor(uri:string = "mongodb://localhost:27017", dbName:string = "lara-lms", collectionName:string = "questions") {
    this.uri = uri;
    this.dbName = dbName;
    this.client = undefined;
    this.collectionName = collectionName;
  }

  async connect() {
    if (!this.client) {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection(this.collectionName);
  }

  async fetchUser(email:string):Promise<any> {
    const collection = await this.connect();
    try {
      const user = await collection.findOne({ email: email });
      return user ? { success: true, user } : { success: false, message: "user not found" };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { success: false, message: "error" };
    }
  }

  async fetchRandomQuestions(inputArray:generateQuestionsRequest[]):Promise<generateQuestionsResponse[]> {
    const collection = await this.connect();
    const output:generateQuestionsResponse[] = [];

    for (const entry of inputArray) {
      const { topic, no_of_questions } = entry;

      if (!topic || !no_of_questions || no_of_questions <= 0 || no_of_questions > 25) {
        continue;
      }

      try {
        const questions = await collection.aggregate([
          { $match: { topic:  new ObjectId( topic )} },
          { $sample: { size: no_of_questions } }
        ]).toArray();

        output.push({
          topic: topic,
          questions: questions.map(q => q._id),
          answers: questions.map(q => q.answer)
        });

      } catch (error) {
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
      this.client = undefined;
    }
  }
}

// Test function to verify the schema
async function testWithSampleData() {
  const inputArray = [
    { "topic": "old", "no_of_questions": 5 },
    { "topic": "new", "no_of_questions": 5 }
  ];
  const userdata = {"email": "admin@laralms.com"}

  // This would work with your sample document:
  // {
  //   "_id": ObjectId("..."),
  //   "question": "what comes next 1, 2, 3, 4, 5, 6 ?",
  //   "options": ["7", "10", "9", "11"],
  //   "answer": "7",
  //   "topic": "series"
  // }

  const service = new MongoService("mongodb://localhost:27017", "lara-lms", "users");
  
  try {
    const result = await service.fetchUser("admin@laralms.com");
  } finally {
    await service.close();
  }
}

// testWithSampleData()

// module.exports = {MongoService}