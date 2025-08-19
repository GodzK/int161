const http = require("node:http");
const port = 3000;

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  let params = urlObj.searchParams;

  let name = params.get("name");
  let subject = params.getAll("subject"); 

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(`<h1>Name: ${name}</h1>`);
  res.write("<h2>Favourite Subjects:</h2><ul>");
  subject.forEach((sub) => {
    res.write(`<li>${sub}</li>`);
  });
  res.write("</ul>");
  res.end();
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

server.on("error", (error) => {
  console.log("Error: " + error.message);
});

server.on("request", (req, res) => {
  console.log(
    "Request received",
    "Header:",
    req.headers.host,
    "Method:",
    req.method
  );
});
