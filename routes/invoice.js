const pdfKit = require("pdfkit");
const fs = require("fs");

let companyLogo = "";
let fileName = "./files/sample-invoice.pdf";
let format = "A4";
let fontNormal = "Helvetica";
let fontBold = "Helvetica-Bold";

let sellerInfo = {
  companyName: "Best Sales Pvt. Ltd.",
  address: "Mumbai Central",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400017",
  country: "India",
  contactNo: "+910000000600",
};

let customerInfo = {
  customerName: "Customer ABC",
  address: "R783, Rose Apartments, Santacruz (E)",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400054",
  country: "India",
  contactNo: "+910000000787",
};

let orderInfo = {
  orderNo: "15484659",
  invoiceNo: "MH-MU-1077",
  invoiceDate: "11/05/2021",
  invoiceTime: "10:57:00 PM",
  products: [
    {
      id: "15785",
      name: "Acer Aspire E573",
      company: "Acer",
      unitPrice: 39999,
      totalPrice: 39999,
      qty: 1,
    },
    {
      id: "15786",
      name: "Dell Magic Mouse WQ1545",
      company: "Dell",
      unitPrice: 2999,
      totalPrice: 5998,
      qty: 2,
    },
  ],
  totalValue: 45997,
};
pdfKit
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//INVOICE FUNCTION

// function createPdf() {
//   try {
const pdfDoc = new pdfKit();
pdfKit.pipe(fs.createWriteStream());

//./files/sample-invoice.pdf

//     let stream = fs.createWriteStream(fileName);
//     console.log(fileName);
//     pdfDoc.pipe(stream);

//     pdfDoc.end();
//     console.log("pdf generate successfully");
//   } catch (error) {
//     console.log("Error occurred", error);
//   }
// }

// createPdf();

// const express = require('express')
// const { build } = require('../controllers/build');
// const cors = require('cors');
// const router = new express.Router()

// router.post('/build', cors(), async (req, res) => {
//     try {
//         const url = await build(req.body);
//         res.status(200).send({ url });
//     } catch (e) {
//         console.log(e)
//         res.status(500).send(e)
//     }
// })

// module.exports = router
