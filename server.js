const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/events", (req, res) => {
  const filePath = path.join(__dirname, "public/assets/data/events.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Erro ao carregar eventos." });
  }
});

app.listen(PORT, () => {
  console.log(`GAIO rodando em http://localhost:${PORT}`);
});