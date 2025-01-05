import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db";
import randomstring from "randomstring";

const app = express();
const port = 3501;

app.use(cors());
app.use(express.json());

app.post("/create", async (req: Request, res: Response) => {
  try {
    const cipher: string = randomstring.generate({
      length: 24,
      capitalization: "lowercase",
    });

    const timestamp: number = Math.floor(Date.now() / 1000);

    const { rows } = await pool.query(
      `INSERT INTO notes (cipher, encrypted_note, created_on, timestamp_user) values($1, $2, NOW(), $3) RETURNING *`,
      [cipher, req.body.note, timestamp]
    );

    const responseCipher = () => {
      res.json({ result: "ok", cipher });
    };

    responseCipher();
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "error", cipher: (err as Error).message });
  }
});

app.post("/getnote", async (req: Request, res: Response) => {
  try {
    const cipher: string = req.body.cipher.trim();

    const { rows } = await pool.query(
      `SELECT encrypted_note FROM notes WHERE cipher = $1`,
      [cipher]
    );
 
    if (rows.length) {
      const note: string = rows[0].encrypted_note;
      res.json({ result: "ok", note });
    } else {
      res.json({ result: "404", note: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "error", note: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});