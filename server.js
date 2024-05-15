require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const userRoute = require("./src/routes/userRoutes");

app.use(express.json());
app.use(cors("*"));
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
