const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
app.use("/user", userRoutes);

const DBConnection = require("./src/utils/DBConnection");
DBConnection();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});