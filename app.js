// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();

// Nunjucks templating
nunjucks.configure('views', { autoescape: true, express: app });

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

// Global user variable
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


// List of allowed origins (front-end URLs)
const allowedOrigins = [
  'https://v0-simple-react-app-design.vercel.app',
  'https://strikersnyc.com'
];
// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // If needed
};

app.use(cors(corsOptions));

// Example route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.use(express.json());  

// Routes
app.use('/auth', require('./routes/auth'));


app.get('/', (req, res) => {
  res.render('index.njk');
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
