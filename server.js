const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Create the 'blogs' directory if it doesn't exist
const blogsDir = path.join(__dirname, 'blogs');
if (!fs.existsSync(blogsDir)) {
    fs.mkdirSync(blogsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, blogsDir); // Set the destination folder
    },
    filename: (req, file, cb) => {
        // You can customize the filename here if needed
        // For now, we'll keep the original filename
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files (like your HTML) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle the file upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    console.log('File uploaded successfully:', req.file);
    res.send('File uploaded successfully!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});