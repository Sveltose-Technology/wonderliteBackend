const Videoslideshow = require("../models/videoslideshow");

exports.add_video = async (req, res) => {
  const { video_url } = req.body;

  const newVideoslideshow = new Videoslideshow({
    video_url: video_url,
  });

  newVideoslideshow.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Video Added",
        data: newVideoslideshow,
      });
    }
  });
  //}
};
