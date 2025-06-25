## Lara-LMS
It is a multiple choice online testing website.

Follow the below steps to run the project
1. clone this repository
2. create a mongodb database name it as `lara-lms`.
3. config `.env` file. create .env file in home directory
```.env
SESSION_SECRET = yourSecredCode
MONGO_URL = yourMongoDbURL
```
4. create a collection named as `topics` and `questions`
    - you can import the sample data from [lara-lms.topics.json](/lara-lms.topics.json) and [lara-lms.quesitons.json](/lara-lms.questions.json) (these files are in home directory)
    - you can also import your **own data with the following fields.**
    - first upload topics data then go for questions data


```json
# topic doc
{
  "_id": "id", // auto generated
  "topic": "topic name"
}

 # questions doc
 {
  "_id":"id", // auto generated
  "question": "String",
  "options": [ "op1","opt2","opt3","opt4"],
  "answer": "answer",
  "topic": "topic id"
}

 ```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
