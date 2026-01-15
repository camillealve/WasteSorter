const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dispose", async (req, res) => {
  const { barcode, city } = req.body;
  console.log("Backend received:", barcode, city);

  try {
    const aiResponse = await axios.post("http://localhost:8000/analyze", {
      barcode,
      city
    });
    console.log("AI response:", aiResponse.data);
    res.json(aiResponse.data);
  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ error: "AI service error" });
  }
});

// original app.listen
// app.listen(5000, () => {
//   console.log("Backend running on port 5000");
// });

app.listen(5000, "0.0.0.0", () => console.log("Backend running on port 5000"));