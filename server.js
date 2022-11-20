
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = 443;
const app = next({ dev: false });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync("./keys/key.pem"),
    cert: fs.readFileSync("./keys/cert.pem")
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log("ready - started server on port: " + port);
    });
});