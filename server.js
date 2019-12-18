const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//Load configuration file
dotenv.config({ path: './config.env' })

const app = express();

//Develper logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Profile routes
app.use('/api/v1/profile', require('./routes/profile'));

//Handle production
if(process.env.NODE_ENV === 'production') {
    //Set static folder (Public folder complied from Vue)
    app.use(express.static(__dirname + '/public/'));

    //Handle single page application
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port=process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${port}`);
});