import express from "express";
import { connection } from "./db.js";
const app = express();
app.use(express.json());

app.post("/buah", async (req, res) => {
    await connection.execute(
        "INSERT INTO buah (id, nama, harga) VALUES (?, ?, ?)",
        [req.body.id, req.body.nama, req.body.harga]
    )

    res.send("buah berhasil ditambah");
})

.put("/buah/:id", async (req, res) => {
    await connection.execute(
        "UPDATE buah SET nama = ?, harga = ? WHERE id = ?",
        [req.body.nama, req.body.harga, req.params.id]
    );

    res.send("buah berhasil diubah");
})

app.get("/buah", async (req, res) => {
    const result = await connection.query("SELECT * FROM buah");
    res.json(result);
})

app.delete("/buah/:id", async (req, res) => {
    await connection.execute(
        "DELETE FROM buah WHERE id = ?",[req.params.id]
    )
    res.send("buah berhasil dihapus");
})

app.listen(3000, ()=> console.log("server berjalan"));