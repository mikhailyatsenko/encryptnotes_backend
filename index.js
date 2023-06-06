const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const randomstring = require("randomstring");

const port = 3501;

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// app.use(express.json());

app.post("/create", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  const cipher = randomstring.generate({
    length: 24,
    capitalization: "lowercase",
  });

  const timestamp = Math.floor(Date.now() / 1000);

  db.query(`INSERT INTO notes (cipher, encrypted_note, created_on, timestamp_user) values($1, $2, $3, $4) RETURNING *`, [cipher, req.body.note, "NOW()", timestamp], (err, res) => {
    if (err) {
      throw err;
    }
    console.log("res", res);
    responseCipher();
  });

  function responseCipher() {
    res.send(JSON.stringify({ result: true, cipher: cipher }));
  }
});

app.post("/getnote", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  try {
    const cipher = req.body.cipher.trim();

    const { rows } = await db.query(`SELECT encrypted_note FROM notes WHERE cipher = $1`, [cipher]);

    if (rows.length) {
      const note = rows[0].encrypted_note;
      res.send(JSON.stringify({ result: true, note: note }));
    } else {
      res.send(JSON.stringify({ result: false, note: "note not found" }));
    }
  } catch (error) {
    console.error(error);
    res.send(JSON.stringify({ result: false, error: error }));
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
