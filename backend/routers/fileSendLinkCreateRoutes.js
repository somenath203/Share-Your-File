const router = require('express').Router();

const { uploadFileAndGetURL, downloadFileFromURL } = require('../controllers/fileSendLinkCreateControllers');
const { upload } = require('./../utils/upload');


router.post('/upload-file-and-create-url', upload.single('file'), uploadFileAndGetURL);
router.get('/UrlOfFile/:idOfTheFile', downloadFileFromURL);


module.exports = router;