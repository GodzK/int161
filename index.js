const http = require('http'); 


const server = http.createServer((req, res) => {

 const product = {
    "id" : "1",
    'name' : "Phakaphol",
    'lastname' : "Dheracahisuphakij"
 }
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.end(JSON.stringify(product));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
