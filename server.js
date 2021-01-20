const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(PORT, () => console.log(`listening on ${PORT}`));