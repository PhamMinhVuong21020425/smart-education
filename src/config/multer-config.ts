import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Cấu hình lưu trữ tạm thời
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Kiểm tra và tạo thư mục uploads nếu chưa tồn tại
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir); // Thư mục lưu tạm thời
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export default upload;
