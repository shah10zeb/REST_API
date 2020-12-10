import express from "express";
import bodyParser from "body-parser";

import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).send("All good here");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
