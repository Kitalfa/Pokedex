require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const route = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views','app/views');

app.use(express.static('public'));

app.locals.pageTitle = `PokeDex`;
app.locals.pageDescription = `Attrapez les tous !`;

app.use(route);

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});
