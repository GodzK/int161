const http = require("node:http");
const port = 3000;

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const params = urlObj.searchParams;
  const num = parseInt(params.get("number"));

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  if (!num || isNaN(num)) {
    res.end("<h1>กรุณาใส่ parameter number เช่น ?number=5</h1>");
    return;
  }

  res.write(`<h1>สูตรคูณแม่ ${num}</h1>`);
  res.write("<ul>");
  for (let i = 1; i <= 12; i++) {
    res.write(`<li>${num} × ${i} = ${num * i}</li>`);
  }
  res.write("</ul>");
  res.end();
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
