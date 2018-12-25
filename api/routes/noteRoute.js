const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({storage: storage});
const noteController = require('../controllers/noteController');

router.post('/', upload.single('attachment'), noteController.create);

router.get('/', noteController.findAll);

router.get('/:noteId', noteController.findOne);

router.put('/:noteId', noteController.update);

router.delete('/:noteId', noteController.delete);


module.exports = router;