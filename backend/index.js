const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dispose", async (req, res) => {
  
  //testing for response
  console.log("Request reached backend!");
  console.log("Body:", req.body);
  console.log("Calling AI service...");

  const { barcode, city } = req.body;

  try {
    // Call AI service
    const aiResponse = await axios.post("http://localhost:8000/analyze", {
      barcode,
      city
    });
    console.log("AI response:", aiResponse.data);  //log AI service output

    // Send AI response directly to frontend
    res.json(aiResponse.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "AI service error" });
  }
});

// app.listen(5000, () => {
//   console.log("Backend running on port 5000");
// });

// changing port
app.listen(5001, () => console.log("Backend running on port 5001"));
