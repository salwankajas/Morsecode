const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js',(req, res) => {
	res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/style.css',(req, res) => {
	res.sendFile(path.join(__dirname, 'style.css'));
});
app.listen(port);
console.log("listenining on " + port);