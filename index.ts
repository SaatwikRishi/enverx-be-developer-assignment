import express from "express";
import blogRouter from "./src/router/posts";
import errorHandler from "./src/utils/middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
const PORT = process.env.PORT || 5000;

app.use("/posts", blogRouter);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
