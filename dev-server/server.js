// Runs a local web server to host files
import express from 'express';
import path from 'path';

const app = express();

app.use('/', express.static(path.join(__dirname, '../build')));
app.use('/', express.static(path.join(__dirname, '../build/views')));

// Start the server
const server = app.listen(3000, function () {
	const host = 'localhost';
	const port = server.address().port;
	console.log('Running a local server at http://%s:%s', host, port);
});
