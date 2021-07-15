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
app.use("/api", aboutus);

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
    console.log("DB CONNECTED SUCCEFULLYabc");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 4444, () => {
  console.log("Example app listening on port 4444!...abcd");
});
