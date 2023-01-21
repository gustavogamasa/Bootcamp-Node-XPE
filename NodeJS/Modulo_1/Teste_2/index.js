import express, { json } from "express";

const app = express();
app.use(express.json())

app.get("/status", (req, res) => {return res.json({status: "ok"})})



app.listen(3333, ()=>{console.log("Api online - Port 3333")})