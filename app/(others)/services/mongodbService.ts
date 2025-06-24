//const { MongoClient, ObjectId } = require("mongodb");
import  {MongoClient, ObjectId} from 'mongodb';
import { generateQuestionsRequest, generateQuestionsResponse } from '../types/testRequest';

// Optimized version with connection pooling for multiple calls
export class MongoService {
    uri:string
    dbName:string
    client?:MongoClient
    collectionName:string
  constructor(uri:string = process.env.MONGO_URL!! , dbName:string = "lara-lms", collectionName:string = "questions") {
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

  async fetchRandomQuestions(inputArray:generateQuestionsRequest[]):Promise<any[]> {
    if (!inputArray){
      return []
    }
    const collection = await this.connect();
    const output:any[] = [];

    for (const entry of inputArray) {
      const { _id, no_of_questions, topic} = entry;

      if (!_id || !no_of_questions || no_of_questions <= 0 || no_of_questions > 25) {
        continue;
      }

      try {
        const questions = await collection.aggregate([
          { $match: { topic:  new ObjectId( _id )} },
          { $sample: { size: no_of_questions } }
        ]).toArray();

        questions.map(q => output.push({...q, topic:topic, _id:q._id.toString()} ))

      } catch (error) {
        console.log(error )
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
