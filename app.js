const createError = require('http-errors');
const express = require('express');
// const exphbs = require("express-handlebars");
// const expressHandlebarsSections = require("express-handlebars-sections");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const usersRouter = require('./routes/users');
// const indexRouter = require('./routes/index');
const homeRouter = require('./components/home');
const shopRouter = require('./components/shop');
const apiShopRouter = require('./components/shop/api');
const detailRouter = require('./components/detail');
const blogRouter = require('./components/blog');
const contactRouter = require('./components/contact');
const cartCheckoutRouter = require('./components/cartCheckout');
// const registerRouter = require('./components/register');
// const LoginRouter = require('./components/login');
const accountRouter = require('./components/account');
const authRouter = require('./components/auth');
const passport = require('./components/auth/passport');
const auth = require('./middlewares/auth');
const homeApiController= require("./components/home/api")
const { SESSION_SECRET } = require('./config/index.js')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', homeRouter);
app.use('/shop', shopRouter);
app.use('/api/shop', apiShopRouter);
app.use('/detail', detailRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/cartCheckout', cartCheckoutRouter);
// app.use('/register', registerRouter);
// app.use('/login', LoginRouter);
app.use('/account', auth, accountRouter);
app.use('/auth', authRouter);
app.use("/api/home", homeApiController)

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
