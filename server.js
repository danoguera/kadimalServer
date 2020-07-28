require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || port;
app.listen(port, () => console.log(`Listening on port ${port}`));