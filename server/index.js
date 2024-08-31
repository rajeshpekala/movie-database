const express = require('express')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;


const data = require("./public/movies.json");
console.log(data)
app.use(cors());

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });