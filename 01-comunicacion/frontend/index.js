const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 19000;

server
  .listen(port)
  .on("listening", () => console.log(`Server is listening on port ${port}`))
  .on("error", (error) => {
    console.log(error);
    process.exit(1);
  });
