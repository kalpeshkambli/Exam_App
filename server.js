const dotenv = require('dotenv');
const app = require('./src/app');
const db = require('./src/config/db');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

