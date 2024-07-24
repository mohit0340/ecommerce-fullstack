import  multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/avatar', // Folder for storing images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use file timestamp and original name
  },
});

const upload = multer({ storage });



const productstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/product');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadproduct = multer({ storage: productstorage });

export {upload,uploadproduct};
