const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); //{ limit: "50mb" }
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
const altunit = require("./routes/altunit");
const brand = require("./routes/brand");
const product = require("./routes/product");
const aboutus = require("./routes/aboutus");
const feedback = require("./routes/feedback");
const flashsale = require("./routes/flashsale");
const bundleoffer = require("./routes/bundleoffer");
const cart = require("./routes/cart");
const companyfeedback = require("./routes/companyfeedback");
const buyonegetone = require("./routes/buyonegetone");
const bannerimage = require("./routes/banner_img");
const stock_clearance = require("./routes/stock_clearance");
//const productsummery = require("./routes/productsummery");
const dealofthe_day = require("./routes/dealofthe_day");
const orderproduct = require("./routes/orderproduct");
const contact_us = require("./routes/contact_us");
const buy_xget_y = require("./routes/buy_xget_y");
const servicerequest = require("./routes/servicerequest");
const offeranddeals = require("./routes/offeranddeals");
const blog_news = require("./routes/blog_news");
const careerform = require("./routes/careerform");
const blog_category = require("./routes/blog_category");
const blog = require("./routes/blog");
const blog_comment = require("./routes/blog_comment");
const privacypolicy = require("./routes/privacypolicy");
const termsandcondition = require("./routes/termsandcondition");
const videoController = require("./routes/videoController");
const newlaunch = require("./routes/newlaunch");
const promotedbrands = require("./routes/promotedbrands");
const order_return = require("./routes/order_return");
const exclusivevalue_deal = require("./routes/exclusivevalue_deal");
const counter = require("./routes/counter");
const rewardpoint = require("./routes/rewardpoint");
const wallet = require("./routes/wallet");
//const image_slider = require("./routes/image_slider");
const product_img = require("./routes/product_img");
const add_product = require("./routes/add_product");
const special_offer = require("./routes/special_offer");
const user_address = require("./routes/user_address");
const role = require("./routes/role");
const web_banner = require("./routes/web_banner");

//Use
app.use("/api", productcategory);
app.use("/api", productsubcategory);
app.use("/api", staff);
app.use("/api", gst_rate);
app.use("/api/", units);
app.use("/api", user);
app.use("/api", enquiry);
app.use("/api", required);
app.use("/api", altunit);
app.use("/api", brand);
app.use("/api", product);
app.use("/api", aboutus);
app.use("/api", feedback);
app.use("/api", flashsale);
app.use("/api", companyfeedback);
app.use("/api", bundleoffer);
app.use("/api", buyonegetone);
app.use("/api", stock_clearance);
app.use("/api", bannerimage);
app.use("/api", cart);
app.use("/api", dealofthe_day);
app.use("/api", orderproduct);
app.use("/api", contact_us);
app.use("/api", buy_xget_y);
app.use("/api", servicerequest);
app.use("/api", offeranddeals);
app.use("/api", blog_news);
app.use("/api", careerform);
app.use("/api", blog_category);
app.use("/api", blog);
app.use("/api", blog_comment);
app.use("/api", privacypolicy);
app.use("/api", termsandcondition);
app.use("/api", videoController);
app.use("/api", newlaunch);
app.use("/api", promotedbrands);
app.use("/api", order_return);
app.use("/api", exclusivevalue_deal);
app.use("/api", counter);
app.use("/api", rewardpoint);
app.use("/api", wallet);
//app.use("/api", image_slider);
app.use("/api", product_img);
app.use("/api", add_product);
app.use("/api", special_offer);
app.use("/api", user_address);
app.use("/api", role);
app.use("/api", web_banner);
//app.use("/api", productsummery);

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
});fgh
*/
app.get("/api", (req, res) => {
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

// INVOICE PDF
// const pdfKit = require("pdfkit");
// const fs = require("fs");

// let companyLogo = "";
// let fileName = "./files/sample-invoice.pdf";
// let fontNormal = "Helvetica";
// let fontBold = "Helvetica-Bold";

// let sellerInfo = {
//   companyName: "Best Sales Pvt. Ltd.",
//   address: "Mumbai Central",
//   city: "Mumbai",
//   state: "Maharashtra",
//   pincode: "400017",
//   country: "India",
//   contactNo: "+910000000600",
// };

// let customerInfo = {
//   customerName: "Customer ABC",
//   address: "R783, Rose Apartments, Santacruz (E)",
//   city: "Mumbai",
//   state: "Maharashtra",
//   pincode: "400054",
//   country: "India",
//   contactNo: "+910000000787",
// };

// let orderInfo = {
//   orderNo: "15484659",
//   invoiceNo: "MH-MU-1077",
//   invoiceDate: "11/05/2021",
//   invoiceTime: "10:57:00 PM",
//   products: [
//     {
//       id: "15785",
//       name: "Acer Aspire E573",
//       company: "Acer",
//       unitPrice: 39999,
//       totalPrice: 39999,
//       qty: 1,
//     },
//     {
//       id: "15786",
//       name: "Dell Magic Mouse WQ1545",
//       company: "Dell",
//       unitPrice: 2999,
//       totalPrice: 5998,
//       qty: 2,
//     },
//   ],
//   totalValue: 45997,
// };

// //INVOICE FUNCTION

// function createPdf() {
//   try {
//     let pdfDoc = new pdfKit(); //./files/sample-invoice.pdf

//     let stream = fs.createWriteStream(fileName);
//     console.log(fileName);
//     pdfDoc.pipe(stream);

//     pdfDoc.text("Node.js - PDF Invoice creation using PDFKit library.", 5, 5, {
//       align: "center",
//       width: 600,
//     });
//     pdfDoc.image(companyLogo, 25, 20, { width: 50, height: 50 });
//     pdfDoc.font(fontBold).text("PARALLELCODES", 7, 75);
//     pdfDoc
//       .font(fontNormal)
//       .fontSize(14)
//       .text("Order Invoice/Bill Receipt", 400, 30, { width: 200 });
//     pdfDoc.fontSize(10).text("11-MAY-2021 10:24 PM", 400, 46, { width: 200 });

//     pdfDoc.font(fontBold).text("Sold by:", 7, 100);
//     pdfDoc
//       .font(fontNormal)
//       .text(sellerInfo.companyName, 7, 115, { width: 250 });
//     pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
//     pdfDoc.text(sellerInfo.city + " " + sellerInfo.pincode, 7, 145, {
//       width: 250,
//     });
//     pdfDoc.text(sellerInfo.state + " " + sellerInfo.country, 7, 160, {
//       width: 250,
//     });

//     pdfDoc.font(fontBold).text("Customer details:", 400, 100);
//     pdfDoc
//       .font(fontNormal)
//       .text(customerInfo.customerName, 400, 115, { width: 250 });
//     pdfDoc.text(customerInfo.address, 400, 130, { width: 250 });
//     pdfDoc.text(customerInfo.city + " " + customerInfo.pincode, 400, 145, {
//       width: 250,
//     });
//     pdfDoc.text(customerInfo.state + " " + customerInfo.country, 400, 160, {
//       width: 250,
//     });

//     pdfDoc.text("Order No:" + orderInfo.orderNo, 7, 195, { width: 250 });
//     pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, { width: 250 });
//     pdfDoc.text(
//       "Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime,
//       7,
//       225,
//       { width: 250 }
//     );

//     pdfDoc.rect(7, 250, 560, 20).fill("#FC427B").stroke("#FC427B");
//     pdfDoc.fillColor("#fff").text("ID", 20, 256, { width: 90 });
//     pdfDoc.text("Product", 110, 256, { width: 190 });
//     pdfDoc.text("Qty", 300, 256, { width: 100 });
//     pdfDoc.text("Price", 400, 256, { width: 100 });
//     pdfDoc.text("Total Price", 500, 256, { width: 100 });

//     let productNo = 1;
//     orderInfo.products.forEach((element) => {
//       console.log("adding", element.name);
//       let y = 256 + productNo * 20;
//       pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
//       pdfDoc.text(element.name, 110, y, { width: 190 });
//       pdfDoc.text(element.qty, 300, y, { width: 100 });
//       pdfDoc.text(element.unitPrice, 400, y, { width: 100 });
//       pdfDoc.text(element.totalPrice, 500, y, { width: 100 });
//       productNo++;
//     });

//     pdfDoc
//       .rect(7, 256 + productNo * 20, 560, 0.2)
//       .fillColor("#000")
//       .stroke("#000");
//     productNo++;

//     pdfDoc.font(fontBold).text("Total:", 400, 256 + productNo * 17);
//     pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + productNo * 17);

//     pdfDoc.end();
//     console.log("pdf generate successfully");
//   } catch (error) {
//     console.log("Error occurred", error);
//   }
// }

//createPdf();

// var document = {
//   path: "./output.pdf",
// };
// pdfKit
//   .create(document, options)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
