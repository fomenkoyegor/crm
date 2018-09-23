const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const key = require('./config/key');
const passport = require('passport');
const app = express();

const mongoDB = mongoose.connect(key.mongoURL, { useNewUrlParser: true });
mongoDB.then(() => {
    console.log('connected mongoDB');
}).catch((err) => {
    console.log('err', err);
});

app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const auth = require('./routes/auth');
const analitycs = require('./routes/analitycs');
const category = require('./routes/category');
const order = require('./routes/order');
const position = require('./routes/position');


// https://httpstatuses.com/
app.use('/api/auth', auth);
app.use('/api/analitycs', analitycs);
app.use('/api/category', category);
app.use('/api/order', order);
app.use('/api/position', position);




// main page
app.use(express.static('client-ng/dist/client-ng'));
app.get('*',  (req, res) => res.sendFile(path.resolve(__dirname,'client-ng','dist','client-ng','index.html')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;