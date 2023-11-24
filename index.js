const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const dbConnect = require("./utils/dbConnect");
const umrahRoute = require("./routes/umrahRoute");
const hotelRoute = require("./routes/hotelRoute");
const visaRoute = require("./routes/visaRoute");
const toursRoute = require("./routes/toursRoute");
const busRoute = require("./routes/busRoute");
const trainRoute = require("./routes/trainRoute");
const hajjRoute = require("./routes/hajjRoute");
const Uploader = require("./middleware/PdfUpload");

app.use(cors());
app.use(express.json());
dbConnect();

app.use("/api/v1", umrahRoute);
app.use("/api/v1", hotelRoute);
app.use("/api/v1", visaRoute);
app.use("/api/v1", busRoute);
app.use("/api/v1", trainRoute);
app.use("/api/v1", toursRoute);
app.use("/api/v1", hajjRoute);

// app.post(
//   "/api/v1/uploads/pdf",
//   Uploader
//   async (req, res) => {
//     try {
//       const files = req.files;
//       const imageLinks = files.map((file) => `/uploads/${file.filename}`);
//       res.status(200).json({
//         message: "success",
//         imageLinks,
//       });
//     } catch (error) {
//       res.send("Internal server error");
//     }
//   }
// );

app.post("/api/v1/uploads/pdf", (req, res) => {
  Uploader(req, res, (err) => {
    if (err) {
      // Handle the error (e.g., invalid file type)
      return res.status(400).send("Error uploading files");
    }

    // Files are uploaded successfully
    const imageLinks = req.files.map((file) => file.path);
    res.status(200).json({ message: "success", imageLinks });
  });
});

app.get("/", (req, res) => {
  res.send("Ghurunti start");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
