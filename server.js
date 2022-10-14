const express = require('express');
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

const db = require("./models");

db.sequelize.sync({force: true})
    .then(() => {
        console.log("Synced db")
    })
    .catch((err) => {
        console.log("Failed to sync db" + err.message);
    });

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome user"});
});


require("./router/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 6200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
