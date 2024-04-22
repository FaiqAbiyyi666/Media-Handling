const express = require("express");
const router = express.Router();
const { image, video, document } = require("../libs/multer");

// Single Images
router.post("/upload/image", image.single("image"), (req, res) => {
  let imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  res.render("uploadedImage", { image_url: imageUrl });
  //   res.json({
  //     image_url: imageUrl,
  //   });
});

// Multiple Images
router.post("/upload/images", image.array("image"), (req, res) => {
  let imagesUrl = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/images/${file.filename}`;
  });
  res.json({ images_url: imagesUrl });
});

// single video (mp4, mpeg, mov)
router.post("/upload/video", video.single("video"), (req, res) => {
  let videoUrl = `${req.protocol}://${req.get("host")}/videos/${
    req.file.filename
  }`;
  res.render("uploadedVideo", { video_url: videoUrl });
});

// multiple video
router.post("/upload/videos", video.array("video"), (req, res) => {
  let videosUrl = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/videos/${file.filename}`;
  });
  res.json({ videos_url: videosUrl });
});

// single document (mp3, mp4 audio)
router.post("/upload/document", document.single("document"), (req, res) => {
  let documentUrl = `${req.protocol}://${req.get("host")}/documents/${
    req.file.filename
  }`;
  res.render("uploadedDocument", { document_url: documentUrl });
});

// multiple document
router.post("/upload/documents", document.array("document"), (req, res) => {
  let documentsUrl = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/documents/${file.filename}`;
  });
  res.json({ documents_url: documentsUrl });
});

module.exports = router;
