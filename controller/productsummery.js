const Summery = require("../models/productsummery");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
//const uniqueFilename = `original/${uniqueFilename}`;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_img = (req, res) => {
  const { title, summery } = req.body;
  if (req.file) {
    // const uniqueFilename = new Date().toISOString();
    const path = req.file.path;
    cloudinary.uploader.upload(path),
      { public_id: ` original/${uniqueFilename}`, tags: original },
      function (err, image) {
        if (err) console.log(err);
        console.log("file uploaded to cloudinary");
        const fs = require("fs");
        fs.unlinkSync(path);
        const data = new Summery({
          title: title,
          summery: summery,
          image: image.secure_url,
        });
        data.save().then((res) => {
          res.json({ code: 200, msg: res });
        });
      };
    //);
  } else {
    res.send("you didnt choose image file");
  }
};

exports.image_data = (req, res) => {
  product.find().then((resp) => {
    res.json({ code: 200, msg: resp });
  });
};
