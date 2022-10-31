const express = require("express");
const router = express.Router();

router.get("/message", (req, res) => {
  res.json({
    message: "Hola from backend2",
  });
});

module.exports = router;
