require("dotenv");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors("*"));

app.listen(PORT, ()=> {
  console.log(`Server is running at PORT:${PORT}`);
})
