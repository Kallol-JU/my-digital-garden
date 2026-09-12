const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send("working");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("listening");
});