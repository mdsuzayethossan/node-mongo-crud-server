const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
//middleware
//7VLn5fv3jBf6k9tJ
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://suzayet:ZgaJtQ5U463T3Me2@cluster0.q1ga5lh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("mongoCrud").collection("people");
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const people = await cursor.toArray();
      res.send(people);
    });
    app.post("/users", async (req, res) => {
      const people = req.body;
      const result = await userCollection.insertOne(people);
      console.log(result);
      res.send(result);
    });
    //update
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const reqUser = req.body;
      const options = { upsert: true };
      const updateUser = {
        $set: {
          name: reqUser.name,
          email: reqUser.email,
          color: reqUser.color,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updateUser,
        options
      );
      res.send(result);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("ami thik moto coltatce");
});
