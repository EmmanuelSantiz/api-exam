const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ControllerProducts = require('./controllers/product');

const port = process.env.PORT || 4000;
const app = express();

app.use(cors())
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json({ type: 'application/json' }));

const ProtectedRoutes = express.Router();
ProtectedRoutes.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: "Tu petición no tiene cabecera de autorización."
        });
    }

    var token = req.headers.authorization;
    if (token && req.headers.authorization.split(" ")[0] == "Bearer") {
        var token = req.headers.authorization.split(" ")[1];
        if(token !== '123') {
            return res.json({
                success: false,
                message: "Fallo de autentificacion Token."
            });
        } else {
            next();
        }
    } else {
        return res.status(403).send({
            message: "No token provided.",
        });
    }
});

app.use('/v1', ProtectedRoutes);
app.use('/v1', ControllerProducts);

app.listen(port, () => {
    console.log("Servidor corriendo!"); 
});