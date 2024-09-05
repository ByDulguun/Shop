import express from 'express';

const app = express();

app.get("/",(_req,res) => {
    res.json({message:"Hello, World!"});
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})