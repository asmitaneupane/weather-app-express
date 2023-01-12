const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const hbs = require('hbs');
const requests = require('requests');

//builtin middleware
const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//to set view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

//template engine route
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    requests("http://api.weatherapi.com/v1/current.json?key=%20819e88945c8743b1b4733554222812&q=Nepal&aqi=yes"
    )
        .on("data", (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            console.log(objData);
            // res.write(arrData[0].name);
            arrData.map((val) =>
            res.write(val.location.name));
        })
        .on("end", (err) => {
            if (err) return console.log("Connection closed due to errors!", err);
            res.end();
        });
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("/about/*", (req, res) => {
    res.render("404", {
        errorComment: "This About Page Couldn't Be Found!"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorComment: "Page Not Found!"
    });
});

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});