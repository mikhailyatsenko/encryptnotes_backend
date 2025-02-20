"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const randomstring_1 = __importDefault(require("randomstring"));
const app = (0, express_1.default)();
const port = 3501;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.default.connect();
    try {
        const cipher = randomstring_1.default.generate({
            length: 24,
            capitalization: "lowercase",
        });
        const timestamp = Math.floor(Date.now() / 1000);
        const { rows } = yield client.query(`INSERT INTO notes (cipher, encrypted_note, created_on, timestamp_user) values($1, $2, NOW(), $3) RETURNING *`, [cipher, req.body.note, timestamp]);
        res.json({ result: "ok", cipher });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "error", cipher: err.message });
    }
    finally {
        client.release(); // Ensure the client is released back to the pool
    }
}));
app.post("/getnote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.default.connect();
    try {
        const cipher = req.body.cipher.trim();
        const { rows } = yield client.query(`SELECT encrypted_note FROM notes WHERE cipher = $1`, [cipher]);
        if (rows.length) {
            const note = rows[0].encrypted_note;
            res.json({ result: "ok", note });
        }
        else {
            res.json({ result: "404", note: "Note not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ result: "error", note: error.message });
    }
    finally {
        client.release(); // Ensure the client is released back to the pool
    }
}));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
