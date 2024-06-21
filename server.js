const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

// Register the Handlebars helper for date formatting
Handlebars.registerHelper('formatDate', function(date) {
  return new Date(date).toLocaleDateString();
});

const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),  
  defaultLayout: 'main',
  extname: '.handlebars',
  helpers: {
    formatDate: function(date) {
      return new Date(date).toLocaleDateString();
    }
  }
});

const sess = {
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
