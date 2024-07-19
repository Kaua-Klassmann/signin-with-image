import multer from "multer";

const fileFilter = (req, file, cb) => {
  const validMimetypes = ["image/jpeg", "image/jpg", "image/png"];

  if (validMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  dest: "./public/images/",
  fileFilter,
});

export default upload;
