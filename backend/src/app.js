// import env and config
import './env.js';
import './mongoose.js';

// import libs
import express from 'express';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import router from './routes/index.js';

const app = express();
app.use(morgan('dev'))
app.use(bodyParser.json())
// set router
router(app);

app.set('port', process.env.PORT || 5000);

export default app;
