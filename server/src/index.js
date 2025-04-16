import express from "express";
import pg from "pg";
import cors from "cors";

let config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true
}

const { Client } = pg;

const connectDB = async () => {
  const client = new Client(config);
  await client.connect();
  return client;
};

const app = express();
const port = 3004;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const executeQuery = async (query, params = []) => {
    const client = await connectDB();
    try {
      const { rows } = await client.query(query, params);
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    } finally {
      await client.end();
    }
  };

  app.get("/feedback", async (req, res) => {
    try {
      const rows = await executeQuery("SELECT * FROM feedback ORDER BY id DESC");
      res.status(200).json({ success: true, data: rows });
    } catch {
      res.status(500).json({ success: false, message: "Error fetching feedback" });
    }
  });

  app.post("/feedback", async (req, res) => {
    const { title, category, detail } = req.body;
  
    if (!title || !category || !detail) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    try {
      const rows = await executeQuery(
        "INSERT INTO feedback (title, category, detail) VALUES ($1, $2, $3) RETURNING *",
        [title, category, detail]
      );
      res.status(201).json({ success: true, message: "Feedback added", data: rows[0] });
    } catch {
      res.status(500).json({ success: false, message: "Error adding feedback" });
    }
  });

  app.get("/feedback/:id", async (req, res) => {
    const feedbackId = req.params.id;
  
    try {
      const rows = await executeQuery(
        "SELECT * FROM feedback WHERE id = $1",
        [feedbackId]
      );
      
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Feedback not found" });
      }
  
      res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
      console.error("Error fetching feedback by id:", error);
      res.status(500).json({ success: false, message: "Error retrieving feedback" });
    }
  });
  