const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes.js');
const cors = require('cors');



dotenv.config(); // Load environment variables

const app = express();

app.use(cors())

app.use(express.json()); // Parse JSON bodies
app.use('/api', routes); // Use routes defined in routes.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
