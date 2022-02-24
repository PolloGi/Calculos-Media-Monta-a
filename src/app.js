const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); //Se guarda del lado del cliente
const path = require('path');
const port = 3500;
const publicPath = path.resolve('public');
const methodOverride = require('method-override');
const mainRouter = require('../routes/main');

app.use(express.static(publicPath));
app.use(methodOverride('_method')); // For PUT and DELETE methods
app.use(express.urlencoded({ extended: false })); //To be able to retrieve the forms data in the req element
app.use(express.json()); //To be able to retrieve the forms data in the req element
app.use(cookieParser()); 

//RUTAS
app.use('/', mainRouter);

//SET NO TOCAR
app.set("view engine", "ejs");

//LISTADO DE SERVIDOR NO TOCAR
app.listen(process.env.PORT || port, () => console.log(`Servidor corriendo en puerto ${port}`));
//ERROR HANDLER
app.use((req, res, next) => {
    res.status(404).render('not-found');
});