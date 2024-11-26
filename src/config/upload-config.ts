import multer from 'multer';

// Allowed file types
const ALLOWED_FILE_TYPES = [
  // Image types
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',

  // Document types
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  // Video types
  'video/mp4',
  'video/mpeg',
  'video/quicktime',

  // Audio types
  'audio/mpeg', // MP3 files
  'audio/wav', // WAV files
  'audio/x-wav', // Alternative WAV MIME type
  'audio/webm', // WebM audio
  'audio/ogg', // OGG audio
];

// File filter function
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Check file type
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only images, PDFs, DOC/DOCX, videos, and audio files are allowed.'
      )
    );
  }
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/uploads/'); // Storage directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '$$' + file.originalname);
  },
});

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB limit
  },
});

export default upload;
