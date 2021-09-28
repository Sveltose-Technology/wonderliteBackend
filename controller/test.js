//     } else if (aadhar_no && pancard_no == null) {
//       res.json({ code: 400, msg: "empty" });
//     } else if (aadhar_no && pancard_no == "consumer") {
//       //customer

//       res.json({ code: 200, msg: "success", usertype: "consumer" });
//     } else if (eb_license == null || eb_license == "undefined") {
//       res.json({ code: 400, msg: "empty" });
//     } else if (eb_license == "Technician") {
//       res.json({ code: 200, msg: "success", usertype: "Technician" });
//     } else if (
//       (gstin_no && farm_name && aadhar_no && pancard_no == null) ||
//       (gstin_no && farm_name && aadhar_no && pancard_no == "undefined")
//     ) {
//       res.json({ code: 400, msg: "empty" });
//     } else if (
//       gstin_no &&
//       farm_name &&
//       aadhar_no &&
//       pancard_no == "contractor"
//     ) {
//       res.json({ code: 200, msg: "success", usertype: "contractor" });
//     } else if (
//       (gstin_no && trade_licence == null) ||
//       (gstin_no && trade_licence == "undefined")
//     ) {
//       res.json({ code: 400, msg: "empty" });
//     } else if (gstin_no && trade_licence == "Retailer") {
//       res.json({ code: 200, msg: "success", usertype: "Retailer" });
//     } else if (udhyog_adhar_no == null || udhyog_adhar_no == "undefined") {
//       res.json({ code: 400, msg: "empty" });
//     } else if (udhyog_adhar_no == "Manufacturer") {
//       res.json({ code: 200, msg: "success", usertype: "Manufacturer" });
//     } else {
//       res.status(400).send({
//         message: "error",
//       });
//     }
//   }
// };

// newAdduser
//   .save()
//   .then(
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: newAdduser,
//     })
//   )
//   .catch((error) => {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: error,
//     });
//   });
