require('dotenv').config();
const express = require('express');
const cors = require('cors');

const fileSendLinkCreateRoutes = require('./routers/fileSendLinkCreateRoutes');
const { connectToMongoDB } = require('./db/dbConnect');

connectToMongoDB();


const app = express();


app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'server is up and running successfully.'
    })
});

app.use(fileSendLinkCreateRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listening to PORT: ${PORT}`);  
});