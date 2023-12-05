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
const hajjRequirementRoute = require("./routes/hajjRequirement")
const visaRequirement = require("./routes/visaRequirement");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

app.use(cors());
app.use(express.json());
dbConnect();

app.use("/api/v1", umrahRoute);
app.use("/api/v1", hotelRoute);
app.use("/api/v1", visaRoute);
app.use("/api/v1", visaRequirement);
app.use("/api/v1", busRoute);
app.use("/api/v1", trainRoute);
app.use("/api/v1", toursRoute);
app.use("/api/v1", hajjRoute);
app.use("/api/v1", hajjRequirementRoute);

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/api/v1/uploads/pdf",
  upload.array("pdfFiles", 5),
  async (req, res) => {
    try {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "auto", folder: "pdf_files" },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  // Do something with the Cloudinary result (e.g., save the URL to a database)
                  resolve(result);
                }
              }
            )
            .end(file.buffer);
        });
      });

      const uploadResults = await Promise.all(uploadPromises);
      const imageLinks = uploadResults.map((result) => result.secure_url);
      res.json({ message: "success", imageLinks });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

app.get("/", (req, res) => {
  res.send("Ghurunti start");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
