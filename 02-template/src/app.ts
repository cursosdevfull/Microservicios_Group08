import express from 'express';

const app = express();
app.get("/healthcheck", (req, res) => {
  res.send("OK");
});

export default app;
