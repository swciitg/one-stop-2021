require('dotenv').config();
require('./passport');

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const nconf = require('./config');
const routers = require('./routers');
const { writeError, writeResponse } = require('./helpers/response');
const app = express();
const api = express();

app.use(nconf.get('api_path'), api);

const swaggerDefinition = {
  info: {
    title: 'OneStop Admin',
    version: '1.0.0',
    description: 'Node APIs for the admin panel of OneStop application',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./controllers/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.set('port', nconf.get('PORT'));
api.use(bodyParser.json());
app.use(helmet());
api.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  session({
    secret: 'a very dark secret indeed',
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb URI', () => {
  console.log('connected to mongodb')
})

// enable CORS
api.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// api routes
api.use(routers.userRouter.userRouter);
api.use(routers.authRouter.authRouter);
api.use(routers.emailRouter.emailRouter)

// For demo auth purposes only
api.get('/user-info', (req, res) => {
  const response = { message: 'User not authenticated' };
  writeResponse(res, response);
});

// api error handler
api.use((err, _req, res, next) => {
  if (err && err.status) {
    writeError(res, err);
  } else next(err);
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${app.get('port')} see docs at /docs`);
});
