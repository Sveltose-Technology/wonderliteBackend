const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//require
const productcategory = require("./routes/productcategory");
const productsubcategory = require("./routes/productsubcategory");
const staff = require("./routes/staff");
const gst_rate = require("./routes/gst_rate");
const units = require("./routes/unit");
const user = require("./routes/user");
const enquiry = require("./routes/enquiry");
const required = require("./routes/required");
const rate = require("./routes/rate");
const altunit = require("./routes/altunit");
const brand = require("./routes/brand");
const product = require("./routes/product");
const aboutus = require("./routes/aboutus");
const feedback = require("./routes/feedback");
const flashsale = require("./routes/flashsale");
//const upload = require("./filehandler/multer");
//const cloudinary = require("cloudinary").v2;
//const fs = require("fs");

//Use
app.use("/api", productcategory);
app.use("/api", productsubcategory);
app.use("/api", staff);
app.use("/api", gst_rate);
app.use("/api/", units);
app.use("/api", user);
app.use("/api", enquiry);
app.use("/api", required);
app.use("/api", rate);
app.use("/api", altunit);
app.use("/api", brand);
app.use("/api", product);
app.use("/api", feedback);
app.use("/api", flashsale);
/*app.use("/upload-images", upload.single(image), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "images");
  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    res.status(200).json({
      msg: "image upload successfully",
      data: urls,
    });
  } else {
    res.status(400).json({
      err: "image not uploaded",
    });
  }
});
*/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 4444, () => {
  console.log("Example app listening on port 4444!");
});
