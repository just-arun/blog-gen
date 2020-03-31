import app from "./app";
import Configuration from "./config/config";

const server = app;

const PORT = new Configuration().PORT;
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
