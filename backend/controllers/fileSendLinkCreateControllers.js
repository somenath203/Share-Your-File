const FileUrl = require('./../models/fileSendLinkCreateModel');


const uploadFileAndGetURL = async (req, res) => {

    try {

        const fileStored = await FileUrl.create({
            pathOfFile: req.file.path,
            nameOfFile: req.file.originalname
        });

        res.status(201).send({
            success: true,
            path: `${req.protocol}://${req.headers.host}/UrlOfFile/${fileStored._id}`
        })

        
    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            message: error.message
        });
        
    }

};


const downloadFileFromURL = async (req, res) => {

    try {

        const findFileByFileID = await FileUrl.findById(req.params.idOfTheFile);

        res.download(findFileByFileID.pathOfFile, findFileByFileID.nameOfFile);
        
    } catch (error) {
        
        console.log(error);

        res.status(500).send({
            success: false,
            message: error.message
        });
        

    }
}

module.exports = {
    uploadFileAndGetURL,
    downloadFileFromURL
}