const express = require('express');
const serverStatic = require('serve-static');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'publica')));

app.listen(port, () => {
    console.log(`server listening in port ${port}`);
});