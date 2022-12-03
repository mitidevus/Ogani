const createError = require('http-errors');
const express = require('express');
const exphbs = require("express-handlebars");
const expressHandlebarsSections = require("express-handlebars-sections");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const usersRouter = require('./routes/users');
// const indexRouter = require('./routes/index');
const homeRouter = require('./components/home');
const shopRouter = require('./components/shop');
const detailRouter = require('./components/detail');
const blogRouter = require('./components/blog');
const contactRouter = require('./components/contact');
const cartCheckoutRouter = require('./components/cartCheckout');

const app = express();


const hbs = exphbs.create({
  helpers: {
    format: (val) => numeral(val).format("0,0") + " đ",
  },
});
expressHandlebarsSections(hbs);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', homeRouter);
app.use('/shop', shopRouter);
app.use('/detail', detailRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/cartCheckout', cartCheckoutRouter);

// catch 404 and forward to error handler
app.use(function(req,
                 res,
                 next) {
  next(createError(404));
});

// error handler
app.use(function(err,
                 req,
                 res,
                 next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;